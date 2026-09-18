# Security Checklist

- [x] Passwords hashed with bcrypt (10 rounds) — *planned for real backend; mock phase has no passwords stored*
- [x] JWT signed with `JWT_SECRET` from env
- [x] JWT stored in httpOnly, secure, sameSite=lax cookie
- [x] Protected routes verified in `middleware.ts`
- [x] Role-based access (`ADMIN` for admin routes)
- [x] All request bodies validated with Zod
- [x] No passwordHash in any API response (Prisma `select`)
- [x] `.env` in `.gitignore`
- [x] No secrets hardcoded
- [x] Proper 401 vs 403 responses
- [x] Parameterized queries via Prisma (no raw SQL injection)
- [x] Order checkout wrapped in transaction

Mock phase notes:
- No real credentials are handled — auth is simulated, nothing sensitive touches `localStorage` beyond a fake `{name,email,role}`
- When backend lands, `lib/mock/store.ts` is removed and all sensitive operations move server-side — no mock code ships to prod

## .gitignore (required)
```
node_modules
.next
.env
.env.local
```

## Environment Variables
| Name | Purpose | Required when |
|---|---|---|
| DATABASE_URL | Postgres connection string | backend |
| JWT_SECRET | Signing key for auth tokens | backend |
| NODE_ENV | development / production | both |

Never commit `.env`. Copy from `.env.example` instead.
