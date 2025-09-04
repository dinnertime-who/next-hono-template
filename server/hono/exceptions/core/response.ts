import { z } from "@hono/zod-openapi";

export type ExceptionResponse = {
  timestamp: string;
  path: string;
  error: {
    code: string;
    message: string;
  };
};

export const ExceptionResponseSchema = z.object({
  timestamp: z.string(),
  path: z.string(),
  error: z.object({
    code: z.string(),
    message: z.string(),
  }),
});
