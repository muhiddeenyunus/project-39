# E-Commerce Order System

## Frontend Implementation Report

### 1. Introduction

This report presents the current implementation of the E-Commerce Order System capstone project.

The work completed at this stage focuses on the **frontend implementation, application structure, user interface, user flows, and mock data** required to demonstrate the intended e-commerce experience.

The frontend has been structured around the major stages of an online shopping process, including product discovery, product browsing, search and filtering, cart management, checkout, and order tracking.

Mock data is currently used in place of the production database and backend services. This allows the frontend to be developed, tested, and demonstrated independently while providing a structured foundation for the subsequent integration of the backend components.

---

## 2. Project Scope

The E-Commerce Order System is intended to be developed as a collaborative full-stack project consisting of several interconnected components.

The broader project scope includes:

* User authentication and authorization
* Product management
* Product catalogue and search
* Shopping cart management
* Order processing
* Payment processing
* Administrative management
* Database persistence
* Frontend user experience
* Testing and deployment

At the current stage, the implementation is focused specifically on the **frontend portion of the system**.

The backend components are not presented as completed functionality in this report. They represent the subsequent stages required to connect the frontend to persistent data and production services.

---

## 3. Current Implementation

The current implementation provides the frontend structure and user experience for the e-commerce application.

The application currently includes interfaces for:

* Product browsing
* Product categories
* Product search
* Product filtering
* Product sorting
* Product display
* Cart management
* Checkout
* Order history
* Order status
* Responsive layouts

The application uses mock data to populate the interface and simulate the information that will eventually be retrieved from the backend.

This makes it possible to demonstrate the intended shopping experience without requiring a configured database at this stage.

---

## 4. Application Structure

The frontend has been structured around the expected e-commerce user journey:

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
Track Order Status
```

This structure provides a clear separation between the major stages of the user experience and creates a foundation for connecting the frontend to backend services later.

---

## 5. Mock Data Implementation

Mock data is currently used to represent the products, categories, and other information required by the frontend.

The mock data allows the application to demonstrate the expected functionality without requiring a live database.

The current mock implementation includes product information such as:

* Product name
* Product category
* Product image
* Current price
* Previous price
* Discount
* Colour
* Rating
* Brand
* Stock information

The mock data is organized separately from the main interface so that it can later be replaced with data retrieved from the backend API.

---

## 6. Product Catalogue

The storefront provides a product catalogue through which users can browse available products.

Product cards are designed to display relevant information and actions, including:

* Product image
* Product name
* Current price
* Previous price where applicable
* Discount information
* Product status
* Wishlist action
* Add-to-cart action

The catalogue is designed to accommodate additional products and categories as the project grows.

---

## 7. Product Categories and Navigation

The frontend uses structured category data to populate the product navigation.

The current category structure includes areas such as:

* Topwear
* Bottomwear
* Gadgets
* Personal Care
* Toys & Games
* Sunglasses & Frames
* Watches
* Festive Wear

The navigation is designed to be data-driven rather than dependent on individually hard-coded category entries.

This means that additional categories can be introduced by updating the underlying data structure when the project moves to a database-backed implementation.

---

## 8. Search and Filtering

The storefront includes frontend search and filtering functionality.

Users can interact with filters based on criteria such as:

* Price
* Discount
* Colour
* Rating
* Brand

The current filtering operations are performed against the mock product data.

The structure also provides a foundation for connecting these filters to API query parameters when the backend is implemented.

---

## 9. Shopping Cart

The frontend includes a shopping cart interface that allows users to manage selected products.

The current cart interface supports:

* Adding products to the cart
* Increasing product quantities
* Decreasing product quantities
* Removing products
* Reviewing selected products
* Viewing cart totals
* Proceeding to checkout

The cart currently operates using mock frontend state and is not yet connected to persistent database storage.

---

## 10. Checkout

A checkout interface has been implemented to represent the intended purchasing process.

The current checkout flow uses mock data and frontend state to demonstrate how a customer would proceed from the cart to an order.

The production checkout process will subsequently be connected to:

1. The backend order service.
2. Persistent cart and order data.
3. Payment processing.
4. Order confirmation.

Therefore, the current checkout should be understood as a **frontend representation of the intended checkout experience**, rather than a completed production payment system.

---

## 11. Orders and Order Tracking

The frontend includes interfaces for displaying orders and their statuses.

Mock order information is currently used to demonstrate:

* Order details
* Ordered products
* Order totals
* Payment status
* Order status
* Order history

The production implementation will replace this mock information with data retrieved from the order API and database.

---

## 12. Responsive Design

The frontend has been structured to provide a responsive shopping experience across different screen sizes.

The interface includes responsive layouts for:

* Navigation
* Product grids
* Product cards
* Filtering
* Cart
* Checkout
* Order views

The objective is to ensure that the core shopping experience remains usable across desktop and smaller screen sizes.

---

## 13. Design Direction

The storefront takes inspiration from the dense and highly interactive shopping experience commonly found on large e-commerce platforms such as Temu and AliExpress.

The implementation includes design patterns such as:

* Dense product presentation
* Category-driven navigation
* Promotional sections
* Product discounts
* Product filtering
* Grid and list views
* Product cards
* Shopping cart interactions
* Responsive layouts

These references were used as design inspiration for the shopping experience. The implementation itself is structured around the requirements of this project.

---

## 14. Planned Backend Integration

The frontend is designed to accommodate the backend components that will be implemented as part of the wider project.

The planned architecture includes:

```text
Frontend
    ↓
Next.js API
    ↓
Business Logic
    ↓
Prisma
    ↓
PostgreSQL
```

Additional services will support:

```text
Authentication
Authorization
Payment Processing
Order Management
Administration
```

The current frontend uses mock data in place of these services.

---

## 15. Mock Data to Live Data

Once the backend is implemented, the current mock data can be replaced with data retrieved from the API.

For example, the current product data can eventually be replaced by:

```text
GET /api/products
```

The cart functionality can subsequently communicate with the cart API, while checkout can communicate with the order and payment services.

The purpose of structuring the frontend this way is to reduce unnecessary changes when the backend becomes available.

---

## 16. Planned Authentication

Authentication is part of the overall system but has not yet been implemented as a production backend service in the current frontend stage.

The planned authentication system will include:

* User registration
* User login
* JWT authentication
* HTTP-only cookies
* Protected routes
* Role-based authorization

The frontend structure can subsequently be connected to these services when the authentication component is implemented.

---

## 17. Planned Payment Integration

Paystack is the planned payment provider for the system.

The intended production flow is:

```text
Cart
  ↓
Checkout
  ↓
Payment Initialization
  ↓
Paystack Checkout
  ↓
Payment Verification
  ↓
Order Confirmation
```

The current frontend does not represent a completed live Paystack payment system. Payment processing will be integrated when the backend payment component is implemented.

---

## 18. Current Status

The current project status can be summarized as follows:

| Component                     | Current Status              |
| ----------------------------- | --------------------------- |
| Frontend interface            | Implemented                 |
| Application structure         | Implemented                 |
| Product catalogue             | Implemented with mock data  |
| Product categories            | Implemented with mock data  |
| Search                        | Implemented with mock data  |
| Filtering                     | Implemented with mock data  |
| Cart interface                | Implemented with mock state |
| Checkout interface            | Implemented with mock flow  |
| Order interface               | Implemented with mock data  |
| Responsive design             | Implemented                 |
| Database                      | Pending                     |
| Backend API                   | Pending                     |
| Production authentication     | Pending                     |
| Persistent cart               | Pending                     |
| Persistent orders             | Pending                     |
| Production payment processing | Pending                     |
| Production deployment         | Pending                     |

---

## 19. Next Development Stages

The following stages will complete the wider system:

### Stage 1: Database

Implement the PostgreSQL database and Prisma schema.

### Stage 2: Backend APIs

Implement the APIs required for:

* Authentication
* Products
* Cart
* Orders
* Payments
* Administration

### Stage 3: Authentication

Connect the frontend to the production authentication and authorization system.

### Stage 4: Persistent Data

Replace mock products, carts, and orders with database-backed data.

### Stage 5: Payment Integration

Connect the checkout process to Paystack and implement payment verification.

### Stage 6: Testing

Test the integrated system across the major user and administrative workflows.

### Stage 7: Deployment

Configure the production environment and deploy the completed application.

---

## 20. Conclusion

The current stage of the E-Commerce Order System establishes the frontend foundation of the project.

The implementation provides the major interfaces and user flows required for an e-commerce application while using mock data to represent the backend services that are yet to be integrated.

The frontend structure has been organized to support the subsequent development of the database, backend APIs, authentication, order management, payment processing, and administrative functionality.

The next phase of development will connect these backend components to the existing frontend and transition the application from a mock-data demonstration into a fully integrated e-commerce system.
