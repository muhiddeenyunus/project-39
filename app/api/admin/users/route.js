import { app } from "@/server/app";

export const GET = (req) => app.admin.users(req);
