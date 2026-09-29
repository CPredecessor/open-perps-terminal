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

Data is a 29 September 2026 research snapshot, not a live API feed. Elapsed time updates in the browser. Official ends take priority, followed by a recorded future source-backed estimate. Otherwise active programs with a known start or timeline anchor use rolling 20-week projections (20, 40, 60 weeks, etc.). At the boundary the target advances. All projections and percentages are labeled Estimated / Not official. Programs with unknown starts are not projected. Lighter Robinhood Chain is anchored to its first weekly drop (21 August), with the terms effective date shown separately. Recorded distributions are partial coverage, not lifetime totals.

This is the only active application in the repository. The old terminal and backend are recoverable from Git history. Subsequent edits on the separately hosted Openpers Site are not automatically synchronized to GitHub.

