import { fail } from "../utils/apiResponse";

export function validate(schema, body) {
  const result = schema(body);
  if (result !== true) return fail(result, 400);
  return null;
}
