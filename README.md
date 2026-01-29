# BRHC Monorepo

## Architecture

- `apps/api` - Fastify REST API (TypeScript)
- `apps/web` - Vue 3 + Vite frontend (TypeScript)
- `packages/ui` - shared UI kit (`@brhc/ui`) used by the web app
- `packages/config` - shared ESLint/Prettier/TSConfig presets (`@brhc/config`)
- `prisma/` - Prisma schema + seed script
- `docs/` - additional documentation (`setup.md`, `railway.md`)

## Requirements

- Node.js (recommended: latest LTS)
- pnpm (repo is pinned via `packageManager` in `package.json`)
- Docker (recommended for local Postgres)

## Environment files

Copy and configure:

- `apps/api/.env.example` -> `apps/api/.env`
- `apps/web/.env.example` -> `apps/web/.env`

### Required variables

#### API (`apps/api/.env`)

- `DATABASE_URL` - Postgres connection string
- `JWT_SECRET` - JWT signing secret

Optional / recommended:

- `PORT=3001`
- `CORS_ORIGIN=http://localhost:5173` (or `*` / comma-separated allowlist)

R2 (only required if using media upload/delete in production):

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_BASE_URL`

#### Web (`apps/web/.env`)

- `VITE_API_BASE_URL=http://localhost:3001`

## Database

### Option A: Local Postgres via Docker (recommended)

1) Install deps:

- `pnpm i`

2) Start Postgres:

- `docker compose up -d db`

3) Run migrations + generate client + seed:

- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:seed`

### Option B: Use a remote Postgres (Railway/Supabase/etc.)

1) Create a Postgres database remotely.
2) Set `DATABASE_URL` in `apps/api/.env` (or your deployment environment).
3) Run Prisma commands against that database:

- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:seed`

## Run the repo (local dev)

From the repo root:

- `pnpm dev`

This runs:

- Web: `http://localhost:5173`
- API: `http://localhost:3001/health`

## Useful scripts

From repo root:

- `pnpm dev` - run web + api in parallel
- `pnpm db:generate` - generate Prisma client
- `pnpm db:migrate` - apply migrations
- `pnpm db:seed` - seed database
- `pnpm typecheck` - typecheck all workspaces

From app folders:

- `pnpm --filter @brhc/api build` / `pnpm --filter @brhc/api start`
- `pnpm --filter @brhc/web build` / `pnpm --filter @brhc/web start`

## Deployment

See `docs/railway.md` for Railway (Postgres + API + Web) setup and required environment variables.
