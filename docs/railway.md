# Railway Deployment (web + api + db)

You will deploy **three separate services**:

- **db**: Postgres plugin/service
- **api**: Node/Fastify
- **web**: Vite/Vue static site

## Environment variables (summary)

### API (`apps/api`)

- `NODE_ENV=production`
- `PORT` (Railway provides this automatically)
- `CORS_ORIGIN` (set to your deployed web URL)
  - You can set multiple origins by comma separating values.
  - You can set `*` to allow all origins (not recommended for production).
- `DATABASE_URL` (from Railway Postgres)
- `JWT_SECRET` (strong secret)

R2 (required for media upload/delete if you use it in production):

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_BASE_URL`

### Web (`apps/web`)

- `VITE_API_BASE_URL` (your deployed API base URL, e.g. `https://<api>.up.railway.app`)

## 1) Create DB

- Create a new project in Railway
- Add a Postgres database
- Copy the `DATABASE_URL`

## 2) Deploy API service

- Create a new service from this repo
- Set **Root Directory**: `apps/api`
- Add variables:
  - `NODE_ENV=production`
  - `PORT=3001` (Railway will override; optional)
  - `CORS_ORIGIN=<your web url>`
  - `DATABASE_URL=<from Railway Postgres>`
  - `JWT_SECRET=<strong secret>`

If you use Media upload/delete in production, also add:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`
- `R2_PUBLIC_BASE_URL`

Start command:

- `pnpm start`

Build command:

- `pnpm build`

Note: Prisma migrations should be run during deployment or via Railway shell.

## 3) Deploy Web service

- Create a new service from this repo
- Set **Root Directory**: `apps/web`
- Add variables:
  - `VITE_API_BASE_URL=<your api url>`

Build command:

- `pnpm build`

Start command:

- `pnpm start`

## 4) Prisma on Railway

From a Railway shell (API service):

- `pnpm db:generate`
- `pnpm db:migrate`
- `pnpm db:seed`

If you prefer running migrations at boot, we can add a production-safe migrate step later.
