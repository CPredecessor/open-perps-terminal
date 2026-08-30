using Npgsql;
using Microsoft.Extensions.Configuration;

namespace OpenPerps.Shared;

public static class Database
{
    public static string ConnectionString(IConfiguration configuration) =>
        configuration["DATABASE_URL"] ?? configuration.GetConnectionString("Postgres")
        ?? throw new InvalidOperationException("DATABASE_URL is required.");

    public static async Task InitializeAsync(string connectionString, CancellationToken ct = default)
    {
        const string sql = """
        create table if not exists indexer_checkpoints (
          name text primary key, block_number bigint not null, updated_at timestamptz not null default now()
        );
        create table if not exists current_positions (
          trader text not null, coin text not null, signed_size numeric(38,12) not null,
          mark_price numeric(38,12) not null, updated_at timestamptz not null,
          primary key (trader, coin)
        );
        create index if not exists ix_current_positions_coin on current_positions(coin);
        create table if not exists market_snapshots (
          id bigserial primary key, captured_at timestamptz not null default now(),
          coin text not null, long_notional numeric(38,2) not null, short_notional numeric(38,2) not null,
          long_traders integer not null, short_traders integer not null
        );
        """;
        await using var connection = new NpgsqlConnection(connectionString);
        await connection.OpenAsync(ct);
        await using var command = new NpgsqlCommand(sql, connection);
        await command.ExecuteNonQueryAsync(ct);
    }
}
