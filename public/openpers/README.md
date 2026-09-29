# Openpers — points explorer

Standalone HTML/CSS/JavaScript site, imported from the published Openpers edition on 2026-09-29.

## Run

From the repository root:

```sh
python -m http.server 8080 --directory public/openpers
```

Open http://localhost:8080. No build or dependencies required. The Node.js preview (`npm run dev` from the repository root) serves this interface at http://127.0.0.1:5173/.

## Files

- `index.html`: page structure and metadata.
- `style.css`: responsive light green theme and timeline styles.
- `app.js`: curated program records, sources, search, filters, details and date calculations.

Data is a 29 September 2026 research snapshot, not a live API feed. Exact official dates determine progress. Without an exact end, a decorative 50% bar says End date unknown; no end dates are estimated. Official latest-end windows remain notes only. Unconfirmed Upcoming exchanges do not get a points timeline.

The app includes funding, reported 24h perpetual volume and USD open interest. Each venue has explicit source URLs, capture dates and scope. Individual funding rounds are distinguished from cumulative totals; parent-company funding is excluded. Market data is not synchronized or live. Lighter covers Robinhood Chain only, and Paradex excludes options. See `docs/market-research-2026-09-29.md`.

This is the only active application in the repository. The old terminal and backend are recoverable from Git history. Subsequent edits on the separately hosted Openpers Site are not automatically synchronized to GitHub.

