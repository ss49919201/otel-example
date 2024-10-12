import { serve } from "@hono/node-server";
import { Span, trace } from "@opentelemetry/api";
import { Resource } from "@opentelemetry/resources";
import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-base";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { Hono } from "hono";

const exporter = new ConsoleSpanExporter();
const processor = new SimpleSpanProcessor(exporter);
const tracerProvider = new NodeTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "hono-server",
  }),
});
tracerProvider.addSpanProcessor(processor);
tracerProvider.register();

const tracer = trace.getTracer("hono-server");

const app = new Hono();

app.get("/", (c) => {
  return tracer.startActiveSpan("GET /", async (span: Span) => {
    span.end();
    return c.text("Hello, World!");
  });
});

serve({
  fetch: app.fetch,
  port: 20000,
});
