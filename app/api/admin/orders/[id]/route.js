import { app } from "@/server/app";

export const PATCH = (req, ctx) => app.admin.patchOrder(req, ctx);
