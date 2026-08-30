# Open Perps backend

.NET 8 services that discover Hyperliquid traders from the public SQD fills dataset, rebuild each trader/coin signed position, store current state in PostgreSQL, and expose read-only positioning endpoints.

## Services

- `OpenPerps.Indexer`: reads `hyperliquid-fills`, excludes spot `@...` assets, checkpoints progress, and upserts current positions.
- `OpenPerps.Api`: exposes `/health`, `/api/positioning/overview`, and `/api/positioning/markets`.
- PostgreSQL: private state store. Tables are created idempotently on startup.

## Local run

```bash
docker compose -f backend/docker-compose.yml up --build
```

## Railway

Create one PostgreSQL database and two services from this repository.

API service:

- Builder: Dockerfile
- Dockerfile path: `backend/Dockerfile.api`
- Variables: `DATABASE_URL` referencing Railway PostgreSQL `DATABASE_URL`, and `ALLOWED_ORIGINS` containing the public frontend URL
- Healthcheck: `/health`

Indexer service:

- Builder: Dockerfile
- Dockerfile path: `backend/Dockerfile.indexer`
- Variables: `DATABASE_URL`, `SQD_BASE_URL=https://portal.sqd.dev/datasets/hyperliquid-fills`, `INDEXER_CHUNK_SIZE=2000`

The API is public; PostgreSQL and Indexer do not need public domains. Never commit Railway secrets.
The API applies an IP-based fixed-window rate limit. CORS origins are supplied only through `ALLOWED_ORIGINS`.
