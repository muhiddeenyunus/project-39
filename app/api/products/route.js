import { app } from "@/server/app";

export const GET = (req) => app.products.list(req);
export const POST = (req) => app.products.create(req);
