import { createRoute, RouteHandler, z } from "@hono/zod-openapi";
import {
  InternalServerErrorSchema,
  NotFoundSchema,
} from "@server/hono/exceptions";
import { AuthType } from "@server/auth";
import { getGeo } from "hono-geo-middleware";
import { getConnInfo } from "hono/vercel";

export const baseRoute = createRoute({
  method: "get",
  path: "/",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
      description: "Hello, World!",
    },
    404: {
      content: {
        "application/json": {
          schema: NotFoundSchema,
        },
      },
      description: "Not Found",
    },
    500: {
      content: {
        "application/json": {
          schema: InternalServerErrorSchema,
        },
      },
      description: "Internal Server Error",
    },
  },
});

export const basicRouter: RouteHandler<
  typeof baseRoute,
  { Bindings: AuthType }
> = (c) => {
  const geo = getGeo(c);
  const connInfo = getConnInfo(c);
  console.log(connInfo);
  return c.json({ message: "Hello, World!" }, 200);
};
