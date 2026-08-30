using Npgsql;
using OpenPerps.Shared;

namespace OpenPerps.Indexer;

public sealed class Worker(SqdClient sqd, IConfiguration configuration, ILogger<Worker> logger) : BackgroundService
{
    private const string Checkpoint = "hyperliquid-fills";
    private readonly string _connectionString = Database.ConnectionString(configuration);
    private readonly int _chunkSize = int.TryParse(configuration["INDEXER_CHUNK_SIZE"], out var size) ? size : 2_000;
    private readonly long? _configuredStart = long.TryParse(configuration["BACKFILL_FROM_BLOCK"], out var start) ? start : null;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        await Database.InitializeAsync(_connectionString, stoppingToken);
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var head = await sqd.GetHeadAsync(stoppingToken);
                var next = await ReadCheckpointAsync(stoppingToken) ?? _configuredStart ?? Math.Max(750_000_000, head - 432_000);
                if (next > head) { await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken); continue; }
                var to = Math.Min(head, next + _chunkSize - 1);
                var count = await ProcessRangeAsync(next, to, stoppingToken);
                await SaveCheckpointAsync(to + 1, stoppingToken);
                logger.LogInformation("Indexed blocks {From}-{To}; {Count} fills", next, to, count);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested) { }
            catch (Exception ex)
            {
                logger.LogError(ex, "Indexer iteration failed");
                await Task.Delay(TimeSpan.FromSeconds(15), stoppingToken);
            }
        }
    }

    private async Task<int> ProcessRangeAsync(long from, long to, CancellationToken ct)
    {
        await using var connection = new NpgsqlConnection(_connectionString);
        await connection.OpenAsync(ct);
        var count = 0;
        await foreach (var fill in sqd.ReadAsync(from, to, ct))
        {
            var signedEnd = fill.StartPosition + (fill.Side.Equals("B", StringComparison.OrdinalIgnoreCase) ? fill.Size : -fill.Size);
            const string sql = """
              insert into current_positions(trader,coin,signed_size,mark_price,updated_at)
              values(@trader,@coin,@size,@price,@updated)
              on conflict(trader,coin) do update set signed_size=excluded.signed_size,
                mark_price=excluded.mark_price,updated_at=excluded.updated_at
              where current_positions.updated_at <= excluded.updated_at
            """;
            await using var command = new NpgsqlCommand(sql, connection);
            command.Parameters.AddWithValue("trader", fill.User.ToLowerInvariant()); command.Parameters.AddWithValue("coin", fill.Coin);
            command.Parameters.AddWithValue("size", signedEnd); command.Parameters.AddWithValue("price", fill.Price); command.Parameters.AddWithValue("updated", fill.UpdatedAt);
            await command.ExecuteNonQueryAsync(ct); count++;
        }
        return count;
    }

    private async Task<long?> ReadCheckpointAsync(CancellationToken ct)
    {
        await using var connection = new NpgsqlConnection(_connectionString); await connection.OpenAsync(ct);
        await using var command = new NpgsqlCommand("select block_number from indexer_checkpoints where name=@name", connection);
        command.Parameters.AddWithValue("name", Checkpoint); return await command.ExecuteScalarAsync(ct) is long value ? value : null;
    }

    private async Task SaveCheckpointAsync(long block, CancellationToken ct)
    {
        await using var connection = new NpgsqlConnection(_connectionString); await connection.OpenAsync(ct);
        await using var command = new NpgsqlCommand("insert into indexer_checkpoints(name,block_number) values(@name,@block) on conflict(name) do update set block_number=excluded.block_number,updated_at=now()", connection);
        command.Parameters.AddWithValue("name", Checkpoint); command.Parameters.AddWithValue("block", block); await command.ExecuteNonQueryAsync(ct);
    }
}
