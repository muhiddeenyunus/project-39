# Database Schema

## Entities
| Table | Purpose |
|---|---|
| User | Customers and admins |
| Category | Product grouping |
| Product | Items for sale |
| Cart | One per user |
| CartItem | Products in a cart with qty |
| Order | A completed checkout |
| OrderItem | Snapshot of items at purchase time |
| Payment | Mock payment record |

## Status Enums
- **Role:** CUSTOMER | ADMIN
- **OrderStatus:** PENDING | PAID | SHIPPED | DELIVERED | CANCELLED
- **PaymentStatus:** PENDING | PAID | FAILED | REFUNDED

## Prisma Schema
```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum Role { CUSTOMER ADMIN }
enum OrderStatus { PENDING PAID SHIPPED DELIVERED CANCELLED }
enum PaymentStatus { PENDING PAID FAILED REFUNDED }

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         Role     @default(CUSTOMER)
  createdAt    DateTime @default(now())
  cart         Cart?
  orders       Order[]
}

model Category {
  id       String    @id @default(cuid())
  name     String    @unique
  slug     String    @unique
  products Product[]
}

model Product {
  id          String      @id @default(cuid())
  name        String
  description String
  price       Decimal     @db.Decimal(10,2)
  stock       Int         @default(0)
  imageUrl    String?
  categoryId  String
  category    Category    @relation(fields: [categoryId], references: [id])
  cartItems   CartItem[]
  orderItems  OrderItem[]
  createdAt   DateTime    @default(now())
}

model Cart {
  id        String     @id @default(cuid())
  userId    String     @unique
  user      User       @relation(fields: [userId], references: [id])
  items     CartItem[]
  createdAt DateTime   @default(now())
}

model CartItem {
  id        String  @id @default(cuid())
  cartId    String
  productId String
  quantity  Int
  cart      Cart    @relation(fields: [cartId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
  @@unique([cartId, productId])
}

model Order {
  id              String       @id @default(cuid())
  userId          String
  user            User         @relation(fields: [userId], references: [id])
  total           Decimal      @db.Decimal(10,2)
  status          OrderStatus  @default(PENDING)
  shippingAddress String
  items           OrderItem[]
  payment         Payment?
  createdAt       DateTime     @default(now())
}

model OrderItem {
  id              String  @id @default(cuid())
  orderId         String
  productId       String
  quantity        Int
  priceAtPurchase Decimal @db.Decimal(10,2)
  order           Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product         Product @relation(fields: [productId], references: [id])
}

model Payment {
  id        String        @id @default(cuid())
  orderId   String        @unique
  order     Order         @relation(fields: [orderId], references: [id])
  method    String
  status    PaymentStatus @default(PENDING)
  amount    Decimal       @db.Decimal(10,2)
  reference String        @unique
  createdAt DateTime      @default(now())
}
```

## Setup
```bash
pnpm prisma migrate dev --name init
pnpm prisma generate
pnpm prisma studio        # optional GUI
```

## Seed (optional)
Add a `prisma/seed.ts` that creates:
- 1 admin: admin@shop.com / Admin123!
- 3 categories
- 10 products
Run with `pnpm prisma db seed`.

For frontend-only phase, seed is simulated by `lib/mock/products.ts` — 100+ products with real image URLs (Unsplash) so the catalog looks production-ready before Postgres is provisioned.

## Mock ↔ Prisma parity
| Mock file | Prisma model |
|---|---|
| `lib/mock/categories.ts` | `Category` |
| `lib/mock/products.ts` | `Product` |
| `localStorage: cart` | `Cart` + `CartItem` |
| `localStorage: orders` | `Order` + `OrderItem` + `Payment` |
When the DB goes live, these files become thin fetch wrappers around `/api/*` — no component changes needed.
