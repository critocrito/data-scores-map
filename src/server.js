// @flow
import http from "http";
import Koa from "koa";
import koaLogger from "koa-bunyan-logger";
import koaRespond from "koa-respond";
import koaCors from "@koa/cors";
import koaBodyparser from "koa-bodyparser";
import dotenv from "dotenv";

import log from "./lib/logging";
import router from "./routes";
import categories from "./categories";
import {companies, systems} from "./company-systems-mapping";

dotenv.config();

const dev = process.env.NODE_ENV === "development";
const port = process.env.DS_HTTP_PORT != null ? process.env.DS_HTTP_PORT : 4000;
const {
  DS_ELASTIC_HOST: elasticHost,
  DS_ELASTIC_PORT: elasticPort,
  DS_ELASTIC_INDEX: elasticIndex,
} = Object.assign(
  {
    DS_ELASTIC_HOST: "localhost",
    DS_ELASTIC_PORT: 9200,
    DS_ELASTIC_INDEX: "data-scores",
  },
  process.env,
);

// When true, do a graceful shutdown by refusing new incoming requests.
let gracefullyClosing = false;

const app = new Koa();

app.context.elastic = {
  host: elasticHost,
  port: elasticPort,
  index: elasticIndex,
};
app.context.categories = categories;
app.context.companies = companies;
app.context.systems = systems;

app.use(koaLogger());
app.use(
  koaRespond({
    methods: {
      closed: (ctx) => {
        ctx.set("Connection", "close");
        ctx.send(502);
      },
    },
  }),
);
app.use(koaCors());
app.use(
  koaBodyparser({
    onerror: (err, ctx) => {
      log.error("Body parser error", {err});
      ctx.throw(422, "body parse error");
    },
  }),
);

// Wrap all results in an envelope.
app.use(async (ctx, next) => {
  await next();
  if (Array.isArray(ctx.body))
    ctx.body = {
      length: ctx.body.length,
      data: ctx.body,
    };
});

// Configure our node app for development.
if (dev) {
  app.use(koaLogger.requestIdContext());
  // FIXME: The flow library definition requires an options object.
  app.use(koaLogger.requestLogger({}));
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

process.on("uncaughtException", (err) =>
  log.error("uncaught exception", {err}),
);
