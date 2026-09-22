import { app } from "@/server/app";

export const GET = (req) => app.cart.get(req);
export const POST = (req) => app.cart.add(req);
export const PUT = (req) => app.cart.sync(req);
