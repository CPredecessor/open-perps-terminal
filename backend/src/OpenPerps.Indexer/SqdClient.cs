using System.Net.Http.Json;
using System.Runtime.CompilerServices;
using System.Text.Json;

namespace OpenPerps.Indexer;

public sealed record Fill(long BlockNumber, string User, string Coin, decimal Price, decimal Size, string Side, decimal StartPosition, DateTime UpdatedAt);

public sealed class SqdClient(HttpClient http, IConfiguration configuration)
{
    private readonly string _baseUrl = configuration["SQD_BASE_URL"] ?? "https://portal.sqd.dev/datasets/hyperliquid-fills";

    public async Task<long> GetHeadAsync(CancellationToken ct)
    {
        using var response = await http.GetAsync($"{_baseUrl}/head", ct);
        response.EnsureSuccessStatusCode();
        using var json = JsonDocument.Parse(await response.Content.ReadAsStreamAsync(ct));
        var root = json.RootElement;
        return root.TryGetProperty("block_number", out var snake) ? snake.GetInt64() : root.GetProperty("number").GetInt64();
    }

    public async IAsyncEnumerable<Fill> ReadAsync(long from, long to, [EnumeratorCancellation] CancellationToken ct)
    {
        var query = new {
            type = "hyperliquidFills", fromBlock = from, toBlock = to,
            fields = new {
                block = new { number = true, timestamp = true },
                fill = new { user = true, coin = true, px = true, sz = true, side = true, time = true, startPosition = true }
            },
            fills = new[] { new { } }
        };
        using var response = await http.PostAsJsonAsync($"{_baseUrl}/stream", query, ct);
        response.EnsureSuccessStatusCode();
        await using var stream = await response.Content.ReadAsStreamAsync(ct);
        using var reader = new StreamReader(stream);
        while (await reader.ReadLineAsync(ct) is { } line)
        {
            if (string.IsNullOrWhiteSpace(line)) continue;
            using var document = JsonDocument.Parse(line);
            var blocks = document.RootElement.ValueKind == JsonValueKind.Array
                ? document.RootElement.EnumerateArray().ToArray()
                : new[] { document.RootElement };
            foreach (var block in blocks)
            {
                var number = block.GetProperty("header").GetProperty("number").GetInt64();
                if (!block.TryGetProperty("fills", out var fills)) continue;
                foreach (var fill in fills.EnumerateArray())
                {
                    var coin = fill.GetProperty("coin").GetString() ?? "";
                    if (coin.StartsWith('@')) continue;
                    var time = fill.TryGetProperty("time", out var t) ? DateTimeOffset.FromUnixTimeMilliseconds(t.GetInt64()).UtcDateTime : DateTime.UtcNow;
                    yield return new Fill(number, fill.GetProperty("user").GetString()!, coin,
                        Decimal(fill, "px"), Decimal(fill, "sz"), fill.GetProperty("side").GetString()!, Decimal(fill, "startPosition"), time);
                }
            }
        }
    }

    private static decimal Decimal(JsonElement value, string name)
    {
        var element = value.GetProperty(name);
        return element.ValueKind == JsonValueKind.String ? decimal.Parse(element.GetString()!, System.Globalization.CultureInfo.InvariantCulture) : element.GetDecimal();
    }
}
