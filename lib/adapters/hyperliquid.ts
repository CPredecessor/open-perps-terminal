import { numeric, type VenueResult } from "../market";

const ENDPOINT = "https://api.hyperliquid.xyz/info";

export async function getHyperliquidMarkets(): Promise<VenueResult> {
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type: "metaAndAssetCtxs" }),
      next: { revalidate: 15 },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const [meta, contexts] = await response.json() as [
      { universe?: Array<{ name?: string }> },
      Array<Record<string, unknown>>,
    ];
    const markets = (meta.universe ?? []).map((asset, index) => {
      const context = contexts[index] ?? {};
      const current = numeric(context.markPx);
      const previous = numeric(context.prevDayPx);
      return {
        symbol: asset.name ?? `ASSET-${index}`,
        venue: "Hyperliquid" as const,
        price: current,
        change: previous ? ((current - previous) / previous) * 100 : 0,
        volume: numeric(context.dayNtlVlm),
        oi: numeric(context.openInterest) * current,
        funding: numeric(context.funding) * 100,
      };
    });
    return { venue: "Hyperliquid", ok: true, markets };
  } catch (error) {
    return { venue: "Hyperliquid", ok: false, markets: [], error: error instanceof Error ? error.message : "Unknown error" };
  }
}
