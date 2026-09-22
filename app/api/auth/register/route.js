import { app } from "@/server/app";

export const POST = (req) => app.auth.register(req);
