# Openpers — points explorer

Standalone HTML/CSS/JavaScript site, imported from the published Openpers edition on 2026-09-29.

## Run

From the repository root:

```sh
python -m http.server 8080 --directory public/openpers
```

Open http://localhost:8080. No build or dependencies required. When served by the existing application, use `/openpers/index.html` (explicit filename).

## Files

- `index.html`: page structure and metadata.
- `style.css`: responsive light green theme and timeline styles.
- `app.js`: curated program records, sources, search, filters, details and date calculations.

Data is a 29 September 2026 research snapshot, not a live API feed. Elapsed time updates in the browser. Unknown end dates never produce completion percentages. Lighter Robinhood Chain is anchored to its first weekly drop (21 August), with the terms effective date shown separately. Recorded distributions are partial coverage, not lifetime totals.

The existing terminal and backend are unchanged. This folder is a source copy; subsequent edits on the hosted Openpers Site are not automatically synchronized to GitHub.
