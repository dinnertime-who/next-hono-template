import { Hono } from "hono";
import { baseRoute, basicRouter } from "./routes/basic";
import { HTTPException } from "hono/http-exception";
import { ExceptionResponse } from "@server/hono/exceptions/core/response";
import {
  INTERNAL_SERVER_ERROR_CODE,
  NOT_IMPLEMENTED_CODE,
} from "@server/hono/exceptions/core/code";
import { OpenAPIHono } from "@hono/zod-openapi";

export const app = new OpenAPIHono()
  .basePath("/api")
  .openapi(baseRoute, basicRouter)
  .notFound((c) =>
    c.json(
      {
        path: c.req.path,
        timestamp: new Date().toISOString(),
        error: {
          code: NOT_IMPLEMENTED_CODE,
          message: "Not Implemented",
        },
      } satisfies ExceptionResponse,
      404
    )
  )
  .onError(async (err, c) => {
    if (err instanceof HTTPException) {
      return c.json(
        {
          path: c.req.path,
          timestamp: new Date().toISOString(),
          error: {
            code: err.cause as string,
            message: err.message,
          },
        } satisfies ExceptionResponse,
        err.status
      );
    }
    return c.json(
      {
        path: c.req.path,
        timestamp: new Date().toISOString(),
        error: {
          code: INTERNAL_SERVER_ERROR_CODE,
          message: "Internal Server Error",
        },
      } satisfies ExceptionResponse,
      500
    );
  });

export type AppType = typeof app;
