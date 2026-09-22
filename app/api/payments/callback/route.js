import { app } from "@/server/app";

export const GET = (req) => app.payments.callback(req);
