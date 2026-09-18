# Deployment

## Recommended: Vercel + Neon Postgres

### 1. Database
1. Create free Postgres at https://neon.tech
2. Copy the connection string

### 2. Push code to GitHub
```bash
git add .
git commit -m "ready for deploy"
git push origin main
```

### 3. Deploy on Vercel
1. Import repo at https://vercel.com/new
2. Add env vars:
   - `DATABASE_URL` = your Neon string
   - `JWT_SECRET` = long random string
3. Deploy

### 4. Run migrations on production
From your machine (with prod DATABASE_URL temporarily in `.env`):
```bash
pnpm prisma migrate deploy
```

Or add to `package.json`:
```json
"scripts": {
  "postinstall": "prisma generate",
  "vercel-build": "prisma migrate deploy && next build"
}
```

### 5. Verify
- Visit the deployed URL
- Register a user
- Add product, checkout
- Login as admin, update order status

## Mock-only deploy (zero DB — works today)
1. Push `main` with current mock storefront — no env vars required
2. Import on Vercel — leave `DATABASE_URL` unset, build succeeds (no Prisma step)
3. Store is live immediately with mock checkout; swap to real DB later by adding env vars + `prisma migrate deploy` — no redeploy of UI needed beyond flipping fetch from `lib/mock` to `/api`

## Alternative hosts
- **Railway** — Postgres + Node in one dashboard
- **Render** — free tier Postgres + Web Service
- **Fly.io** — Docker-based, more control
