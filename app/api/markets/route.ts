import { getHyperliquidMarkets } from "../../../lib/adapters/hyperliquid";
import { getLighterMarkets } from "../../../lib/adapters/lighter";

export const revalidate = 15;

export async function GET() {
  const venues = await Promise.all([getHyperliquidMarkets(), getLighterMarkets()]);
  return Response.json({
    generatedAt: new Date().toISOString(),
    partial: venues.some((venue) => !venue.ok),
    venues: venues.map(({ venue, ok, error }) => ({ venue, ok, error })),
    markets: venues.flatMap((venue) => venue.markets),
  }, { headers: { "cache-control": "public, s-maxage=15, stale-while-revalidate=45" } });
}
