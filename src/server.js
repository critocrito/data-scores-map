import http from "http";
import Koa from "koa";
import koaLogger from "koa-bunyan-logger";
import koaRespond from "koa-respond";
import dotenv from "dotenv";

import log from "./lib/logging";
import router from "./routes";

dotenv.config();

const dev = process.env.NODE_ENV === "development";
const port = process.env.DS_HTTP_PORT || 4000;

// When true, do a graceful shutdown by refusing new incoming requests.
let gracefullyClosing = false;

const app = new Koa();

//
app.use(koaLogger());
app.use(
  koaRespond({
    methods: {
      closed: ctx => {
        ctx.set("Connection", "close");
        ctx.send(502);
      },
    },
  }),
);

// Wrap all results in an envelope.
app.use(async (ctx, next) => {
  await next();
  ctx.body = Object.assign(
    {data: ctx.body},
    Array.isArray(ctx.body) ? {length: ctx.body.length} : {},
  );
});

// Configure our node app for development.
if (dev) {
  app.use(koaLogger.requestIdContext());
  app.use(koaLogger.requestLogger());
}

// Refuse new connections when shutting down the server.
app.use((ctx, next) => (!gracefullyClosing ? next() : ctx.closed()));

// Route all requests.
app.use(router.routes());
app.use(router.allowedMethods());

// Instantiate and start the HTTP server.
const httpServer = http.createServer(app.callback()).listen(port);

httpServer.on("listening", () => log.info(`Server started on port ${port}`));

// Gracefully shutdown on SIGTERM
// This might not work very well with websockets.
process.on("SIGTERM", () => {
  gracefullyClosing = true;
  log.info("Received kill signal (SIGTERM), shutting down gracefully.");

  // waiting for existing connections to close and exit the process
  httpServer.close(() => {
    log.info("Closed out remaining connections.");
    process.exit();
  });

  setTimeout(() => {
    log.error("Could not close connections in time, forcefully shutting down.");
    process.exit(1);
  }, 30 * 1000);
});

process.on("uncaughtException", err => log.error("uncaught exception", {err}));
