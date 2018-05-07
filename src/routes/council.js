// @flow
import Router from "koa-router";
import {list} from "../lib/council";

const router = new Router().get("councils", "/councils", async ctx => {
  const result = await list();
  return ctx.ok(result);
});

export default router;
