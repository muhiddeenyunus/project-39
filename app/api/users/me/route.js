import { app } from "@/server/app";

export const GET = (req) => app.users.profile(req);
