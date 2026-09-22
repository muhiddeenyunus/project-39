import { app } from "@/server/app";

export const POST = (req) => app.payments.initialize(req);
