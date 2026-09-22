# Report 2.0 — Team Workload Mapped onto the Existing Next.js App

This report explains how the current working application follows the team’s six-part Express-style split while keeping the already-built storefront and remaining a single Next.js app.

## 1. What we kept from the earlier frontend work

The previous stage delivered the shop UI in `app/page.tsx`: catalogue, filters, search, cart view, checkout modal, profile menu, and responsive layout.

That UI is still the customer-facing app. It was not rewritten. Product cards, navigation, filters, and checkout chrome stay the same. The only change is that those screens now call the team backend through `/api/*` instead of living only in React state.

The product list itself is shared as `lib/catalog.ts` so the same catalogue seeds the UI fallback and the backend product table.

## 2. How the team’s Express filenames map to Next.js

The team asked for models, routes, controllers, services, validations, middleware, and `app.js`. Those files exist under `server/`, using the agreed names (`User.js`, `authRoutes.js`, `authController.js`, and so on).

Next.js still owns HTTP. Thin files in `app/api/` call into `server/app.js`, which is Team Member 6’s composition root: it wires every teammate’s routes into one object.

```text
Browser (existing frontend)
        ↓
app/api/*/route.js          Next.js API layer
        ↓
server/app.js               connects all parts
        ↓
server/routes/*             teammate route files
        ↓
server/controllers/*
        ↓
server/services/* + models + validations
        ↓
server/config/db.js         local store now, Supabase when keys are real
```

This follows the teammate’s layered idea without forcing a second Express process.

## 3. The 6-part split as implemented

### Part 1 — Authentication & user accounts (Team Member 1)

Files: `server/models/User.js`, `server/routes/authRoutes.js`, `server/routes/userRoutes.js`, `server/controllers/authController.js`, `server/controllers/userController.js`, `server/services/authService.js`, `server/validations/authValidation.js`.

HTTP: `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me`, `GET /api/users/me`.

The storefront login/register modal and profile menu use these endpoints. Session is an httpOnly `auth_token` cookie from `generateToken.js`. Passwords are stored with scrypt hashing. When `NEXT_PUBLIC_SUPABASE_URL` is a real URL, `authService` uses Supabase Auth (`signUp` / `signInWithPassword`) and syncs each account into the `users` table. Until then the placeholders `[SLE]` and `[SYNC KEY]` keep the local path running.

The first registered account, or any email containing `admin`, is `ADMIN`. Everyone else is `CUSTOMER`.

### Part 2 — Product management (Team Member 2)

Files: `server/models/Product.js`, `server/routes/productRoutes.js`, `server/controllers/productController.js`, `server/services/productService.js`, `server/validations/productValidation.js`.

HTTP: `GET /api/products`, `GET /api/products/:id`, admin `POST` / `PATCH` / `DELETE`.

The homepage loads the catalogue from `GET /api/products` and keeps the original filter/sort UI on that list.

### Part 3 — Shopping cart (Team Member 3)

Files: `server/models/Cart.js`, `server/routes/cartRoutes.js`, `server/controllers/cartController.js`, `server/services/cartService.js`.

HTTP: `GET /api/cart`, `POST /api/cart`, `PUT /api/cart` (sync), `PATCH` / `DELETE /api/cart/items/:id`.

The existing cart buttons still update the UI immediately. When a user is logged in, the same actions also hit the cart API. Stock is checked in `cartService`.

### Part 4 — Ordering & checkout (Team Member 4)

Files: `server/models/Order.js`, `server/models/OrderItem.js`, `server/routes/orderRoutes.js`, `server/routes/paymentRoutes.js`, `server/controllers/orderController.js`, `server/controllers/paymentController.js`, `server/services/orderService.js`, `server/services/paymentService.js`, `server/validations/orderValidation.js`, `server/validations/paymentValidation.js`.

HTTP: `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`, `POST /api/payments/initialize`, `GET /api/payments/callback`.

Pay Now starts a Paystack transaction in NGN and redirects to the Paystack checkout page. Paystack redirects back to `/api/payments/callback`, which verifies the reference server-side and only then creates the order: cart (or the current selected product ids) becomes order items, prices are snapshotted, stock drops, the cart is cleared, and the Paystack reference is stored on the order. Profile → My Orders reads `GET /api/orders`.

### Part 5 — Admin controls (Team Member 5)

Files: `server/routes/adminRoutes.js`, `server/controllers/adminController.js`.

HTTP: `GET /api/admin/users`, `GET /api/admin/metrics`, `GET /api/admin/orders`, `PATCH /api/admin/orders/:id`.

`/admin` lists users, site metrics, products, and orders. Admins can add and delete products and change order statuses. `middleware.ts` plus `adminMiddleware.js` keep non-admins out of admin APIs.

### Part 6 — Core infrastructure (Team Member 6)

Files: `server/config/env.js`, `server/config/db.js`, `server/middleware/authMiddleware.js`, `server/middleware/adminMiddleware.js`, `server/middleware/validateMiddleware.js`, `server/middleware/errorHandlerMiddleware.js`, `server/utils/apiResponse.js`, `server/utils/generateToken.js`, `server/app.js`.

`env.js` reads:

- `NEXT_PUBLIC_SUPABASE_URL=[SLE]`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=[SYNC KEY]`
- `SUPABASE_SERVICE_ROLE_KEY=[SYNC KEY]`
- `JWT_SECRET=[SYNC KEY]`
- `PAYSTACK_SECRET_KEY=[SYNC KEY]`
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=[SYNC KEY]`
- `NEXT_PUBLIC_APP_URL=http://localhost:3000`

`db.js` seeds products from the shared catalogue into `data/db.json` so the app runs before real Supabase credentials exist. Once `[SLE]` / `[SYNC KEY]` are replaced with a real Supabase project and `supabase/schema.sql` is applied (users, products, carts, cart_items, orders, order_items, payments), the same services read and write Supabase tables with no storefront change. Payments activate as soon as a real Paystack secret key (`sk_...`) is set. Responses stay `{ success, data, message }` as in `docs/API.md`.

## 4. End-to-end path that is live locally

1. Open the storefront (prices in ₦).
2. Register or login (Part 1).
3. Browse products from the API (Part 2).
4. Add/remove cart items (Part 3).
5. Pay Now redirects to Paystack, then the verified callback creates the order (Part 4).
6. Admin can view users/metrics/products, manage products, and change order status (Part 5).
7. Env, cookies, guards, and route wiring come from Part 6.

No second server is required. `pnpm dev` runs frontend and backend together.

## 5. What is intentionally simple

This phase is a minimal production setup. Data lives in `data/db.json` until `[SLE]` / `[SYNC KEY]` are replaced with a real Supabase project, and payments stay unconfigured until a real Paystack secret key is set. After that, run `supabase/schema.sql` and the same services talk to Supabase Auth, Postgres, and Paystack without changing the storefront. Only product images remain static URLs.

The older `docs/REPORT.md` remains the frontend-only history. This Report 2.0 is the backend-integration record of how the teammate’s six-part plan was followed on top of that UI.
