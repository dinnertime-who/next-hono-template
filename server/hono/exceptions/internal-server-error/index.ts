import { HTTPException } from "hono/http-exception";
import { INTERNAL_SERVER_ERROR_CODE } from "../core/code";
import { z } from "@hono/zod-openapi";
import { ExceptionResponseSchema } from "../core/response";

export class InternalServerErrorException extends HTTPException {
  constructor(message: string = "Internal Server Error") {
    super(500, { message, cause: INTERNAL_SERVER_ERROR_CODE });
  }
}

export const InternalServerErrorSchema = ExceptionResponseSchema.extend({
  error: z.object({
    code: z.literal(INTERNAL_SERVER_ERROR_CODE),
    message: z.string(),
  }),
});
