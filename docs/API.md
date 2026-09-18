# API Documentation

Base URL: `/api`
All responses: `{ success: boolean, data?: any, message?: string }`

> Mock phase: these endpoints are not yet mounted — `lib/mock/*` returns the same shapes locally. When the backend is wired, the documented contracts below are what the frontend will call.

## Auth
| Method | Endpoint | Auth | Body | Success | Errors |
|---|---|---|---|---|---|
| POST | `/auth/register` | No | `{name,email,password}` | 201 user | 400 invalid, 409 email taken |
| POST | `/auth/login` | No | `{email,password}` | 200 user + cookie | 401 invalid |
| POST | `/auth/logout` | Yes | — | 200 | 401 |
| GET | `/auth/me` | Yes | — | 200 user | 401 |

## Products
| Method | Endpoint | Auth | Notes |
|---|---|---|---|
| GET | `/products?search=&page=&limit=` | No | paginated list |
| GET | `/products/:id` | No | details |
| POST | `/products` | Admin | `{name,description,price,stock,categoryId,imageUrl?}` |
| PATCH | `/products/:id` | Admin | partial update |
| DELETE | `/products/:id` | Admin | 204 |

## Cart
| Method | Endpoint | Auth | Body |
|---|---|---|---|
| GET | `/cart` | Yes | — |
| POST | `/cart/items` | Yes | `{productId, quantity}` |
| PATCH | `/cart/items/:id` | Yes | `{quantity}` |
| DELETE | `/cart/items/:id` | Yes | — |

## Orders
| Method | Endpoint | Auth | Body |
|---|---|---|---|
| POST | `/orders` | Yes | `{shippingAddress, paymentMethod}` → creates order from cart |
| GET | `/orders` | Yes | list own orders |
| GET | `/orders/:id` | Yes | own order only |
| GET | `/admin/orders` | Admin | all orders |
| PATCH | `/admin/orders/:id` | Admin | `{status}` |

## Error Codes
- 400 Bad Request — validation failed
- 401 Unauthorized — missing/invalid token
- 403 Forbidden — wrong role
- 404 Not Found
- 409 Conflict — duplicate email, etc.
- 500 Server Error

## Example
```http
POST /api/auth/register
Content-Type: application/json

{ "name": "Jane", "email": "jane@x.com", "password": "Secret123!" }
```
```json
{
  "success": true,
  "data": { "id": "ck...", "name": "Jane", "email": "jane@x.com", "role": "CUSTOMER" }
}
```

## Mock equivalents (today)
| API | Mock call |
|---|---|
| `GET /products?search=` | `searchProducts(q)` in `lib/mock/products.ts` |
| `POST /cart/items` | `addToCart(productId, qty)` in `lib/mock/store.ts` |
| `POST /orders` | `checkout(address, method)` in `lib/mock/store.ts` |
Shapes match 1:1 so tests written against mocks pass against the real API later.
