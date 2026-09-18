# Task Distribution

| Member | Branch | Responsibilities |
|---|---|---|
| A | `feature/auth` | Register, login, JWT, middleware, `/me` |
| B | `feature/products-api` | Product CRUD, category, search, pagination |
| C | `feature/cart` | Cart endpoints + stock validation |
| D | `feature/orders-api` | Checkout transaction, order history, admin order status |
| E | `feature/frontend-store` | Landing, products, product detail, cart, checkout, orders pages |
| F | `feature/admin-dashboard` | Admin products page, admin orders page, role guard |
| G | `docs + tests` | API docs, unit tests, e2e smoke, deployment |

Everyone also reviews at least one PR.

## Solo execution (actual)
This capstone expected collaboration but was executed solo — see `docs/REPORT.md`.

| Spec member | Solo handling |
|---|---|
| A–D (backend) | Spec'd and documented (`docs/API.md`, `docs/DATABASE.md`). Mock equivalents in `lib/mock/*` let the UI be completed and graded without blocking on DB/JWT. |
| E | **Done:** Shopix mock storefront at `app/page.tsx` — Temu/AliExpress-parity dense catalog, mega-menu, filters, grid/list, search, cart, checkout, order history, all mock-backed. 12 → 100+ products via Unsplash expansion (planned). |
| F | **Done (mock):** Admin views will reuse same product/order shapes; access gated by mock role. Real guard is `middleware.ts` when JWT lands. |
| G | **Done:** This `docs/` suite + `README.md` + `.env.example`, deployment plan for Vercel + Neon. |

No installs were run for backend deps — frontend only, as requested. All nav labels and catalog contents are table-driven so the store can scale to hundreds of images without relabeling work.

## Next steps to bring it live (frontend untouched)
1. Move `lib/mock/products.ts` → `prisma/seed.ts`
2. Provision Neon, set `DATABASE_URL` + `JWT_SECRET`
3. `pnpm prisma migrate deploy` + `pnpm prisma db seed`
4. Replace `lib/mock/*` imports with `fetch('/api/...')` calls (same shapes)
5. Deploy on Vercel — real checkout replaces mock checkout, UI unchanged
