import { app } from "@/server/app";

export const GET = (req) => app.auth.me(req);
