import { authController } from "./routes/authRoutes";
import { userController } from "./routes/userRoutes";
import { productController } from "./routes/productRoutes";
import { cartController } from "./routes/cartRoutes";
import { orderController } from "./routes/orderRoutes";
import { paymentController } from "./routes/paymentRoutes";
import { adminController } from "./routes/adminRoutes";

export const app = {
  auth: authController,
  users: userController,
  products: productController,
  cart: cartController,
  orders: orderController,
  payments: paymentController,
  admin: adminController,
};
