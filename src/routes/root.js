import Router from "koa-router";

const router = new Router().get("root", "/", ctx => ctx.ok("Hello World!"));

export default router;
