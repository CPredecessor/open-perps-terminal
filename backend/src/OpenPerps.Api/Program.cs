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
      select count(*) filter (where signed_size <> 0) as positions,
             count(distinct trader) filter (where signed_size <> 0) as traders,
             coalesce(sum(abs(signed_size) * mark_price) filter (where signed_size > 0), 0) as long_notional,
             coalesce(sum(abs(signed_size) * mark_price) filter (where signed_size < 0), 0) as short_notional,
             max(updated_at) as updated_at
      from current_positions
    """;
    await using var command = new NpgsqlCommand(sql, connection);
    await using var reader = await command.ExecuteReaderAsync(ct);
    await reader.ReadAsync(ct);
    return Results.Ok(new {
        trackedTraders = reader.GetInt64(1), openPositions = reader.GetInt64(0),
        longNotional = reader.GetDecimal(2), shortNotional = reader.GetDecimal(3),
        updatedAt = reader.IsDBNull(4) ? (DateTime?)null : reader.GetDateTime(4),
        scope = "Hyperliquid traders discovered from SQD fills"
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
