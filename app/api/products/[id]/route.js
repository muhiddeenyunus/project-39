import { app } from "@/server/app";

export const GET = (req, ctx) => app.products.detail(req, ctx);
export const PATCH = (req, ctx) => app.products.update(req, ctx);
export const DELETE = (req, ctx) => app.products.remove(req, ctx);
