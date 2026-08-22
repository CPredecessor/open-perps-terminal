# Open Perps Terminal

Open-source perpetual DEX intelligence for Hyperliquid and Lighter. The project normalizes public market data into one fast, transparent screener.

> Public MVP: the dashboard currently ships with a representative fallback snapshot while `/api/markets` connects to public protocol endpoints. The UI will switch fully to normalized live responses after response fixtures and schema tests are locked down.

## Features

- Hyperliquid and Lighter comparison cards
- Perpetual market screener with search, venue filtering and sorting
- Watchlist interaction
- Read-only wallet analysis across Hyperliquid, Lighter Mainnet and Lighter on Robinhood Chain
- Normalized collateral, exposure, PnL, activity and open-position views
- Normalized read-only market-data API
- Independent, failure-tolerant protocol adapters
- Responsive terminal interface
- No wallet connection, custody or private keys

## Stack

- Next.js / React / TypeScript
- Vinext for Cloudflare-compatible output
- Public Hyperliquid and Lighter APIs
- Apache-2.0 license

## Run locally

```bash
npm ci
npm run dev
```

Production validation:

```bash
npm run lint
npm test
```

## API

`GET /api/markets` returns:

```json
{
  "generatedAt": "2026-08-22T00:00:00.000Z",
  "partial": false,
  "venues": [{ "venue": "Hyperliquid", "ok": true }],
  "markets": [{ "symbol": "BTC", "venue": "Hyperliquid", "price": 117842 }]
}
```

Provider failures are isolated. If one protocol is unavailable, the endpoint marks the response as partial and still returns data from healthy adapters.

`GET /api/wallet?address=0x...` queries the same public address independently on Hyperliquid, Lighter Mainnet and Lighter's Robinhood deployment. Each provider has a bounded deadline, so one slow venue cannot hold the full analysis open.

## Add a DEX

Create an adapter in `lib/adapters`, map the provider response to `NormalizedMarket`, return a `VenueResult`, then register it in `app/api/markets/route.ts`. Adapters must be read-only and must not request user credentials.

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md) and the [Apache-2.0 license](LICENSE).

## Data sources

- [Hyperliquid Info endpoint](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint)
- [Lighter orderBooks endpoint](https://apidocs.lighter.xyz/reference/orderbooks)
- [Lighter account endpoint](https://apidocs.lighter.xyz/reference/account-1)
- [Lighter on Robinhood Chain points](https://docs.lighter.xyz/points-program/lighter-on-robinhood-chain-points)

Market data is informational and may be delayed or incomplete. Nothing in this project is financial advice.
