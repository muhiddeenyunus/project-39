import { app } from "@/server/app";

export const GET = (req) => app.orders.list(req);
export const POST = (req) => app.orders.create(req);
