import { numeric, type VenueResult } from "../market";

const first = (record: Record<string, unknown>, keys: string[]) => keys.map((key) => record[key]).find((value) => value !== undefined);

export async function getLighterMarkets(robinhood=false): Promise<VenueResult> {
  const venue=robinhood?"Lighter · Robinhood" as const:"Lighter" as const;
  const endpoint=`${robinhood?"https://api.rh.lighter.xyz":"https://mainnet.zklighter.elliot.ai"}/api/v1/orderBooks?filter=perp`;
  try {
    const response = await fetch(endpoint, { next: { revalidate: 15 } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const payload = await response.json() as Record<string, unknown> | unknown[];
    const rows = Array.isArray(payload) ? payload : (payload.order_books ?? payload.orderBooks ?? []) as unknown[];
    const markets = rows.filter((row): row is Record<string, unknown> => !!row && typeof row === "object").map((row, index) => {
      const symbol = String(first(row, ["symbol", "market_symbol", "name"]) ?? `MARKET-${index}`).replace(/[-_/]?(PERP|USD|USDC)$/i, "");
      const current = numeric(first(row, ["last_trade_price", "last_price", "mark_price", "price"]));
      const previous = numeric(first(row, ["daily_price_low", "previous_price", "prev_day_price"]));
      return {
        symbol,
        venue,
        price: current,
        change: numeric(first(row, ["daily_price_change", "price_change_percent"])) || (previous ? ((current - previous) / previous) * 100 : 0),
        volume: numeric(first(row, ["daily_quote_token_volume", "quote_volume", "volume_24h"])),
        oi: numeric(first(row, ["open_interest", "openInterest"])) * current,
        funding: numeric(first(row, ["current_funding_rate", "funding_rate", "fundingRate"])) * 100,
      };
    });
    return { venue, ok: true, markets };
  } catch (error) {
    return { venue, ok: false, markets: [], error: error instanceof Error ? error.message : "Unknown error" };
  }
}
