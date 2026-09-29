# Openpers — Points explorer

Track perpetual DEX points programs, season timelines, official sources and recorded distributions. The light green Points explorer is the project's only active interface.

## Local preview

Install Node.js 22.13 or newer, then run:

```sh
npm run dev
```

Open http://127.0.0.1:5173/. No dependencies, database or credentials are needed. The previous `/openpers/index.html` preview link redirects to the home page.

## Validate and build

```sh
npm run lint
npm test
npm run build
```

The build copies the three static site files to `dist/`, ready for static hosting. It does not publish them.

## Source and data

- `public/openpers/index.html`: page structure.
- `public/openpers/style.css`: responsive light green design.
- `public/openpers/app.js`: program records, sources, filters, details and timelines.
- `scripts/serve.mjs`: local preview at the root URL.

The current data is a research snapshot from 29 September 2026, not a live market feed. Elapsed time updates in the browser. Missing facts remain unavailable. Unknown end dates use a fixed decorative half-bar, never an estimated deadline. Funding and scoped USD market snapshots include sources and dates in each detail view. Recorded distribution totals may cover only part of a program's history. See `public/openpers/README.md` for details.

The older trading terminal, wallet analysis, market adapters and .NET backend have been retired. They remain recoverable from Git history. The separately hosted Openpers edition is not automatically synchronized with this repository.

Apache-2.0 license. Independent research; not affiliated with the exchanges.
