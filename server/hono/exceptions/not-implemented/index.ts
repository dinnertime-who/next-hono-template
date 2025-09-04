import { HTTPException } from "hono/http-exception";
import { NOT_IMPLEMENTED_CODE } from "../core/code";
import { z } from "@hono/zod-openapi";
import { ExceptionResponseSchema } from "../core/response";

export class NotImplementedException extends HTTPException {
  constructor(message: string = "Not Implemented") {
    super(404, { message, cause: NOT_IMPLEMENTED_CODE });
  }
}

export const NotImplementedSchema = ExceptionResponseSchema.extend({
  error: z.object({
    code: z.literal(NOT_IMPLEMENTED_CODE),
    message: z.string(),
  }),
});
