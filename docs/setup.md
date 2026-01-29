# BRHC Monorepo Setup

## Local dev (recommended)

1) Install dependencies:

- `pnpm i`

2) Start database (Postgres):

- `docker compose up -d db`

3) Migrate + seed:

- `pnpm db:migrate`
- `pnpm db:seed`

4) Run apps:

- `pnpm dev`

Web: http://localhost:5173
API: http://localhost:3001/health

## Local dev (all-in-docker)

- `docker compose up --build`

This runs `db`, `api`, and `web` containers.

## Environment files

- `apps/api/.env.example`
- `apps/web/.env.example`

Copy to `.env` and adjust as needed.
