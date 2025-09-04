import { HTTPException } from "hono/http-exception";
import { NOT_FOUND_CODE } from "../core/code";
import { z } from "@hono/zod-openapi";
import { ExceptionResponseSchema } from "../core/response";

export class NotFoundException extends HTTPException {
  constructor(message: string = "Not Found") {
    super(404, { message, cause: NOT_FOUND_CODE });
  }
}

export const NotFoundSchema = ExceptionResponseSchema.extend({
  error: z.object({
    code: z.literal(NOT_FOUND_CODE),
    message: z.string(),
  }),
});
