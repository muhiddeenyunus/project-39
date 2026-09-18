# E-Commerce Order System

An e-commerce web application designed to provide a complete online shopping experience, including product browsing, search, filtering, cart management, checkout, order tracking, authentication, payment processing, and administration.

## Project Overview

The E-Commerce Order System is being developed as a collaborative capstone project.

The application is structured as a full-stack system, with the frontend serving as the user-facing layer and backend services providing persistent data, authentication, order processing, and payment functionality.

### Current Development Stage

The current implementation focuses on the **frontend and application structure**.

The frontend currently uses **mock data** to demonstrate the intended e-commerce experience. The production database, backend APIs, authentication system, persistent order management, and live payment processing are planned for subsequent development stages.

---

## Current Features

The current frontend implementation includes:

* Product catalogue
* Product categories
* Product search
* Product filtering
* Product sorting
* Product cards
* Product images
* Discount displays
* Wishlist interface
* Shopping cart
* Quantity management
* Checkout interface
* Order history
* Order status
* Responsive layouts
* Mock product data
* Mock category data
* Mock order data

---

## User Flow

The current frontend follows the intended e-commerce user journey:

```text
Storefront
    ↓
Browse Products
    ↓
Search / Filter
    ↓
View Product
    ↓
Add to Cart
    ↓
Review Cart
    ↓
Checkout
    ↓
View Order
    ↓
Track Order
```

---

## Technology

The project is built around a modern web application architecture.

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Planned Backend

* Next.js API routes
* Prisma
* PostgreSQL
* JWT authentication
* Zod validation

### Planned Payment Provider

* Paystack

---

## Project Structure

```text
.
├── app/
│   ├── page.tsx
│   ├── api/
│   └── admin/
│
├── lib/
│   └── mock/
│       ├── products.ts
│       ├── categories.ts
│       └── store.ts
│
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DATABASE.md
│   ├── API.md
│   ├── SETUP.md
│   ├── SECURITY.md
│   ├── TESTING.md
│   ├── DEPLOYMENT.md
│   ├── GIT_WORKFLOW.md
│   └── TASKS.md
│
├── REPORT.md
├── README.md
└── .env.example
```

The exact structure may expand as the backend and other project components are implemented.

---

## Running the Current Frontend

The current frontend uses mock data and is intended to demonstrate the application without requiring a production database.

### Install Dependencies

If dependencies have not already been installed:

```bash
pnpm install
```

### Start the Development Server

```bash
pnpm dev
```

Open the local development address provided by Next.js.

---

## Mock Data

The current frontend uses mock data for the information normally expected from the backend.

This includes:

* Products
* Categories
* Product prices
* Discounts
* Product images
* Stock information
* Orders
* Order statuses

The mock data allows the frontend experience to be developed before the database and API services are connected.

---

## Planned Backend

The completed system is expected to include backend services for:

### Authentication

* Registration
* Login
* JWT authentication
* Protected routes
* Role-based access

### Products

* Product retrieval
* Search
* Filtering
* Pagination
* Product management

### Cart

* Add item
* Update quantity
* Remove item
* Stock validation
* Persistent cart

### Orders

* Order creation
* Order history
* Order status
* Order management
* Stock updates

### Payments

* Payment initialization
* Paystack checkout
* Payment verification
* Payment confirmation

### Administration

* Product management
* Order management
* Administrative access control

---

## Planned Payment Flow

Paystack will be integrated as the payment provider.

The intended flow is:

```text
Customer Checkout
       ↓
Payment Initialization
       ↓
Paystack
       ↓
Payment Verification
       ↓
Order Confirmation
```

The current frontend only provides the checkout interface. Live payment processing will be implemented as part of the backend integration.

---

## Development Roadmap

### Completed at the Current Stage

* Frontend application structure
* Storefront interface
* Product catalogue
* Product categories
* Search
* Filtering
* Cart interface
* Checkout interface
* Order interface
* Responsive layouts
* Mock data

### Upcoming

* PostgreSQL database
* Prisma integration
* Backend API
* Authentication
* Persistent cart
* Persistent orders
* Stock management
* Admin backend
* Paystack integration
* Automated testing
* Production deployment

---

## Documentation

Additional project documentation is organized in the `docs` directory.

| File              | Description                            |
| ----------------- | -------------------------------------- |
| `ARCHITECTURE.md` | Overall application architecture       |
| `DATABASE.md`     | Planned database structure             |
| `API.md`          | Planned API endpoints and contracts    |
| `SETUP.md`        | Project setup instructions             |
| `SECURITY.md`     | Security considerations                |
| `TESTING.md`      | Testing strategy                       |
| `DEPLOYMENT.md`   | Deployment process                     |
| `GIT_WORKFLOW.md` | Collaboration and Git workflow         |
| `TASKS.md`        | Project tasks and development tracking |
| `REPORT.md`       | Current implementation report          |

---

## Development Approach

The project currently follows a **frontend-first, mock-data approach**.

This allows the user interface and core user experience to be developed independently from the backend.

Once the backend becomes available, the mock data and frontend state can be replaced with API-driven data and persistent database operations.

The objective is to maintain a clear separation between the user interface and the underlying data services.

---

## Project Status

**Current stage: Frontend implementation with mock data**

The application currently demonstrates the intended e-commerce user experience. Backend integration and production services remain part of the subsequent development stages.

---

## License

This project is developed as a collaborative capstone project for educational and demonstration purposes.
