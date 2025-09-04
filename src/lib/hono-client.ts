import { type AppType } from "@server/hono";
import { hc } from "hono/client";

export const honoClient = hc<AppType>("/");
