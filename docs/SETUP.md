# Local Setup

## 1. Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- PostgreSQL running locally OR a free cloud DB (Neon / Supabase / Railway) — **only for full backend; not needed for mock UI**

## 2. Clone and install
```bash
git clone <repo-url>
cd project-39-ecommerce
pnpm install
# do NOT run pnpm approve-builds / prisma generate until you need the DB
```

## 3. Environment variables

### Mock storefront (default — no env needed)
No `.env` required. Just `pnpm dev`.

### Full backend
Create `.env`:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/project39"
JWT_SECRET="replace-with-long-random-string"
NODE_ENV="development"
```

## 4. Migrate DB (backend only)
```bash
pnpm prisma migrate dev --name init
```

## 5. (Optional) Seed
```bash
pnpm prisma db seed
```
Mock phase uses `lib/mock/products.ts` instead — 100+ image-backed products already ship with the repo.

## 6. Run
```bash
pnpm dev
```
Open http://localhost:3000

## Frontend-only workflow (current)
- Do not install Prisma/Postgres. UI is driven by `lib/mock/*` + `localStorage`
- To go live later: add `DATABASE_URL` + `JWT_SECRET`, run `pnpm prisma migrate deploy`, replace mock calls with `fetch('/api/...')` — zero UI changes

## Common issues
- **"Cannot find module"** → run `pnpm add <pkg>`
- **Prisma "engine not found"** → `pnpm approve-builds` then `pnpm prisma generate` (backend only)
- **DB connection refused** → check `DATABASE_URL`, ensure Postgres is running
- **Mock data not showing** → clear `localStorage` and reload; mock re-hydrates from `lib/mock/products.ts`
