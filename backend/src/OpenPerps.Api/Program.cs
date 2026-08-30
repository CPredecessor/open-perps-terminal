using Npgsql;
using OpenPerps.Shared;
using System.Threading.RateLimiting;

var builder = WebApplication.CreateBuilder(args);
var connectionString = Database.ConnectionString(builder.Configuration);
var allowedOrigins = (builder.Configuration["ALLOWED_ORIGINS"] ?? "http://localhost:3000,http://localhost:5173")
    .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy
    .WithOrigins(allowedOrigins).AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions { PermitLimit = 120, Window = TimeSpan.FromMinutes(1), QueueLimit = 0 }));
});
builder.Services.AddHealthChecks();

var app = builder.Build();
await Database.InitializeAsync(connectionString);
app.UseCors();
app.UseRateLimiter();
app.MapHealthChecks("/health");

app.MapGet("/api/positioning/overview", async (CancellationToken ct) =>
{
    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync(ct);
    const string sql = """
      with active as (
        select trader, signed_size, abs(signed_size) * mark_price as notional, updated_at
        from current_positions where signed_size <> 0
      ),
      per_trader as (
        select trader,
          coalesce(sum(notional) filter (where signed_size > 0), 0) as long_notional,
          coalesce(sum(notional) filter (where signed_size < 0), 0) as short_notional
        from active group by trader
      ),
      ranked as (
        select *, row_number() over(order by long_notional desc) as long_rank,
                  row_number() over(order by short_notional desc) as short_rank
        from per_trader
      )
      select
        (select count(*) from active),
        (select count(*) from per_trader),
        coalesce(sum(long_notional), 0),
        coalesce(sum(short_notional), 0),
        count(*) filter (where long_notional > 0),
        count(*) filter (where short_notional > 0),
        coalesce(sum(long_notional) filter (where long_rank <= 10), 0),
        coalesce(sum(short_notional) filter (where short_rank <= 10), 0),
        (select count(*) from active where signed_size > 0),
        (select count(*) from active where signed_size < 0),
        (select max(updated_at) from active)
      from ranked
    """;
    await using var command = new NpgsqlCommand(sql, connection);
    await using var reader = await command.ExecuteReaderAsync(ct);
    await reader.ReadAsync(ct);
    var longNotional = reader.GetDecimal(2);
    var shortNotional = reader.GetDecimal(3);
    var longTraders = reader.GetInt64(4);
    var shortTraders = reader.GetInt64(5);
    return Results.Ok(new {
        openPositions = reader.GetInt64(0), trackedTraders = reader.GetInt64(1),
        longNotional, shortNotional, longTraders, shortTraders,
        top10LongNotional = reader.GetDecimal(6), top10ShortNotional = reader.GetDecimal(7),
        longPositions = reader.GetInt64(8), shortPositions = reader.GetInt64(9),
        averageLongPerTrader = longTraders == 0 ? 0 : longNotional / longTraders,
        averageShortPerTrader = shortTraders == 0 ? 0 : shortNotional / shortTraders,
        updatedAt = reader.IsDBNull(10) ? (DateTime?)null : reader.GetDateTime(10),
        scope = "OpenPerps active traders discovered from Hyperliquid SQD fills"
    });
});

app.MapGet("/api/positioning/markets", async (CancellationToken ct) =>
{
    await using var connection = new NpgsqlConnection(connectionString);
    await connection.OpenAsync(ct);
    const string sql = """
      select coin,
             coalesce(sum(abs(signed_size) * mark_price) filter (where signed_size > 0), 0),
             coalesce(sum(abs(signed_size) * mark_price) filter (where signed_size < 0), 0),
             count(distinct trader) filter (where signed_size > 0),
             count(distinct trader) filter (where signed_size < 0), max(updated_at)
      from current_positions where signed_size <> 0 group by coin
      order by sum(abs(signed_size) * mark_price) desc
    """;
    await using var command = new NpgsqlCommand(sql, connection);
    await using var reader = await command.ExecuteReaderAsync(ct);
    var rows = new List<object>();
    while (await reader.ReadAsync(ct)) rows.Add(new {
        coin = reader.GetString(0), longNotional = reader.GetDecimal(1), shortNotional = reader.GetDecimal(2),
        longTraders = reader.GetInt64(3), shortTraders = reader.GetInt64(4), updatedAt = reader.GetDateTime(5)
    });
    return Results.Ok(rows);
});

app.Run();
