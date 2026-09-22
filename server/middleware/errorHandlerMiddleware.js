import { fail } from "../utils/apiResponse";

export function wrap(handler) {
  return async (req, ctx) => {
    try {
      return await handler(req, ctx);
    } catch (err) {
      return fail(err.message || "Server error", err.status || 500);
    }
  };
}

export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  throw err;
}
