import { HTTPException } from "hono/http-exception";
import { UNAUTHORIZED_CODE } from "../core/code";
import { z } from "@hono/zod-openapi";
import { ExceptionResponseSchema } from "../core/response";

export class UnauthorizedException extends HTTPException {
  constructor(message: string = "Unauthorized") {
    super(401, { message, cause: UNAUTHORIZED_CODE });
  }
}

export const UnauthorizedSchema = ExceptionResponseSchema.extend({
  error: z.object({
    code: z.literal(UNAUTHORIZED_CODE),
    message: z.string(),
  }),
});
