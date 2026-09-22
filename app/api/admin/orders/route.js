import { app } from "@/server/app";

export const GET = (req) => app.admin.orders(req);
