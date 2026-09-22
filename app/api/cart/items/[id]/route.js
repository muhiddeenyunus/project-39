import { app } from "@/server/app";

export const PATCH = (req, ctx) => app.cart.update(req, ctx);
export const DELETE = (req, ctx) => app.cart.remove(req, ctx);
