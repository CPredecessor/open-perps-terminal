export type NormalizedMarket = {
  symbol: string;
  venue: "Hyperliquid" | "Lighter";
  price: number;
  change: number;
  volume: number;
  oi: number;
  funding: number;
};

export type VenueResult = {
  venue: NormalizedMarket["venue"];
  ok: boolean;
  markets: NormalizedMarket[];
  error?: string;
};

export const numeric = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};
