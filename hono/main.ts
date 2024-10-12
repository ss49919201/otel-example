import { sdk } from "./instrumentation";
sdk.start();

import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, World!");
});

serve({
  fetch: app.fetch,
  port: 20000,
});
