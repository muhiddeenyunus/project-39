# Architecture

## Overview
Single Next.js app serves both frontend (React pages) and backend (API routes).
Prisma talks to PostgreSQL. Auth via JWT in httpOnly cookie.

> **Current mock phase:** UI in `app/page.tsx` runs without any API — products/cart/orders live in `lib/mock/*` + `localStorage`. The structure below is the target; mock modules mirror the same shapes so swapping `fetch('/api/...')` later is a find-replace.

## Folder Structure
```
src/
├── app/
│   ├── api/                    # backend
│   │   ├── auth/
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── products/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   ├── cart/
│   │   │   ├── route.ts
│   │   │   └── items/[id]/route.ts
│   │   ├── orders/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── admin/
│   │       └── orders/[id]/route.ts
│   ├── (auth)/login/page.tsx
│   ├── (auth)/register/page.tsx
│   ├── products/page.tsx
│   ├── products/[id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── orders/page.tsx
│   ├── orders/[id]/page.tsx
│   ├── admin/products/page.tsx
│   ├── admin/orders/page.tsx
│   ├── about/page.tsx
│   └── page.tsx                # landing — Shopix mock (now) → real catalog later
├── components/                 # Navbar, ProductCard, CartItem, etc.
├── lib/
│   ├── prisma.ts               # Prisma singleton
│   ├── auth.ts                 # JWT sign/verify, getSession
│   ├── validators.ts           # Zod schemas
│   └── mock/                   # added for frontend-only phase
│       ├── products.ts         # 100+ items with Unsplash images
│       ├── categories.ts       # table-driven nav labels
│       └── store.ts            # cart/orders localStorage helpers
├── middleware.ts               # protects /admin and /api/admin
└── types/index.ts
prisma/
└── schema.prisma
```

Actual current layout (before `src/` move) — `app/`, `components/`, `lib/`, `hooks/` at root — is functionally identical.

## Data Model
- User  1─1 Cart  1─n CartItem
- User  1─n Order 1─n OrderItem
- Order 1─1 Payment
- Category 1─n Product
- Product 1─n CartItem / OrderItem

Mock mirrors this: `Category` and `Product` are plain TS arrays; `Cart`/`Order` live in `localStorage`.

## Auth Flow
1. `POST /api/auth/register` → hash password → create user → sign JWT → set cookie
2. `POST /api/auth/login` → verify password → sign JWT → set cookie
3. `GET /api/auth/me` → read cookie → verify JWT → return user
4. `middleware.ts` blocks `/admin/*` and `/api/admin/*` if role !== ADMIN

Mock: auth is simulated (any email/password works, role stored in `localStorage`), so UI can be exercised without a DB.

## Order Flow (transactional)
1. Read user's cart + items
2. Validate stock for each item
3. Create Order + OrderItems (priceAtPurchase snapshot)
4. Decrement Product.stock
5. Create Payment (status = PAID, mock)
6. Clear cart
All inside `prisma.$transaction(...)` so partial failures roll back.

Mock: same steps run synchronously in `lib/mock/store.ts` (no transaction, but stock is not persisted across reloads — intentional for demo).

## Table-driven navigation (Temu/AliExpress parity)
Nav labels come from `lib/mock/categories.ts` / later `Category` table. Adding a new top-level section is an insert, not a code change:
```ts
// lib/mock/categories.ts
export const NAV = [
  { label: "Topwear", items: ["Casual Shirts", "T-Shirts", ...] },
  { label: "Bottomwear", items: ["Jeans", ...] },
  // ...
]
```
`Today's Deal` mega-menu renders directly from this array — see `app/page.tsx` (`showMega` section). This is what lets the store feel alive while we swap in real images per category (100s of Unsplash/Picsum URLs per category, not hard-coded per product).
