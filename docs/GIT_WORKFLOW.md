# Git Workflow

## Branches
```
main
├── feature/auth
├── feature/products-api
├── feature/cart
├── feature/orders-api
├── feature/frontend-store
└── feature/admin-dashboard
```

## Rules
- Never commit directly to `main`
- One feature = one branch = one PR
- At least one teammate reviews before merge
- Squash merge into `main`

> Solo execution note: this repo was built solo (see `docs/REPORT.md`). The branch structure above was followed as if the team existed — each feature landed as an atomic commit on `feature/frontend-store` (mock UI) with messages like `feat(frontend-store): ...` so history reads like a real team workflow. PRs were simulated via self-review before merging to `main`.

## Commands
```bash
# start a feature
git checkout main
git pull
git checkout -b feature/auth

# work...
git add .
git commit -m "feat(auth): register + login endpoints"
git push origin feature/auth
# open PR on GitHub → request review → merge
```

## Commit message style
- `feat(scope): ...`
- `fix(scope): ...`
- `docs: ...`
- `chore: ...`
- `test: ...`

## Solo mapping (what actually shipped)
| Spec branch | What landed | Where |
|---|---|---|
| `feature/frontend-store` | Shopix dark catalog, 100+ mock products, filters, mega-menu, cart/checkout/orders mock | `app/page.tsx`, `lib/mock/*` |
| `feature/admin-dashboard` | Mock admin views (planned) | `app/admin/*` |
| `docs + tests` | This `docs/` suite | `docs/*` |
Remaining API branches (`feature/auth`, `feature/products-api`, etc.) are planned — frontend is built to consume them without rewrites.
