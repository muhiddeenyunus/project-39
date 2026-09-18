# Testing

## Tools
- Vitest or Jest for unit tests
- Supertest for API route tests
- Playwright (optional) for e2e

## Install
```bash
pnpm add -D vitest @vitest/coverage-v8 supertest @types/supertest
```
> Do not install during mock-only phase unless you are adding tests now. Mocks are testable with Vitest alone.

## Minimum test coverage (graded)
1. **Auth**
   - Register with valid data → 201
   - Register with duplicate email → 409
   - Login wrong password → 401
   - `/auth/me` without cookie → 401
2. **Products**
   - GET list returns paginated data
   - POST as non-admin → 403
   - POST as admin → 201
3. **Cart**
   - Add item with qty 0 → 400
   - Add valid item → 200
4. **Orders**
   - Checkout with empty cart → 400
   - Checkout valid → 201 + stock decremented + cart cleared

## Run
```bash
pnpm test
pnpm test -- --coverage
```

## Mock-phase tests (available now without DB)
- `lib/mock/products.test.ts` — search + pagination + category filter
- `lib/mock/store.test.ts` — add/update/remove cart, checkout creates order, stock mock decremented, cart cleared, validation (qty 0 → error, empty cart → 400)
- Component smoke — `ProductCard`, `CartItem`, `Checkout` render with mock data
These mirror the API contracts so the same assertions pass once `/api/*` is live.
