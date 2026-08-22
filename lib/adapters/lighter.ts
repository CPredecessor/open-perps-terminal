import { numeric, type VenueResult } from "../market";

const ENDPOINT = "https://mainnet.zklighter.elliot.ai/api/v1/orderBooks?filter=perp";
const first = (record: Record<string, unknown>, keys: string[]) => keys.map((key) => record[key]).find((value) => value !== undefined);

export async function getLighterMarkets(): Promise<VenueResult> {
  try {
    const response = await fetch(ENDPOINT, { next: { revalidate: 15 } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json() as Record<string, unknown> | unknown[];
    const rows = Array.isArray(payload) ? payload : (payload.order_books ?? payload.orderBooks ?? []) as unknown[];
    const markets = rows.filter((row): row is Record<string, unknown> => !!row && typeof row === "object").map((row, index) => {
      const symbol = String(first(row, ["symbol", "market_symbol", "name"]) ?? `MARKET-${index}`).replace(/[-_/]?(PERP|USD|USDC)$/i, "");
      const current = numeric(first(row, ["last_trade_price", "last_price", "mark_price", "price"]));
      const previous = numeric(first(row, ["daily_price_low", "previous_price", "prev_day_price"]));
      return {
        symbol,
        venue: "Lighter" as const,
        price: current,
        change: numeric(first(row, ["daily_price_change", "price_change_percent"])) || (previous ? ((current - previous) / previous) * 100 : 0),
        volume: numeric(first(row, ["daily_quote_token_volume", "quote_volume", "volume_24h"])),
        oi: numeric(first(row, ["open_interest", "openInterest"])) * current,
        funding: numeric(first(row, ["current_funding_rate", "funding_rate", "fundingRate"])) * 100,
      };
    });
    return { venue: "Lighter", ok: true, markets };
  } catch (error) {
    return { venue: "Lighter", ok: false, markets: [], error: error instanceof Error ? error.message : "Unknown error" };
  }
}
