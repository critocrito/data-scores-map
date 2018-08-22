// @flow
import Router from "koa-router";
import {documents} from "../lib/stats";

const router = new Router().get("documents", "/documents", async (ctx) => {
  const {elastic} = ctx;
  const result = await documents(elastic);
  return ctx.ok(result);
});

export default router;
