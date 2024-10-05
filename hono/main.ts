(async () => {
  await import("./instrumentation");
})();

import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("Hello, World!"));

serve({
  fetch: app.fetch,
  port: 20000,
});
