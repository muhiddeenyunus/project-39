import { app } from "@/server/app";

export const GET = (req, ctx) => app.orders.detail(req, ctx);
