# Contributing to Open Perps Terminal

Thanks for helping build transparent perpetual-market infrastructure.

## Local setup

1. Install Node.js 22 or newer.
2. Run `npm ci`.
3. Run `npm run dev`.
4. Open the local URL printed by the development server.

Before opening a pull request, run `npm run lint` and `npm test`.

## Ways to contribute

- Add a protocol adapter under `lib/adapters`.
- Improve normalization and symbol matching.
- Add tests for unusual API responses.
- Improve accessibility, responsive behavior or documentation.

Keep pull requests focused. New adapters must use public/read-only endpoints, return normalized markets, handle provider errors without crashing the whole API and never require wallet keys.

Use Conventional Commit-style titles such as `feat: add drift adapter` or `fix: normalize lighter symbols`.
