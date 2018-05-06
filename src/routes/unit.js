// @flow
import Router from "koa-router";
import {list} from "../lib/unit";

const router = new Router().post("units", "/units", async ctx => {
  const ids = ctx.request.body.ids || [];
  const result = await list(ids);
  return ctx.ok(result);
});

export default router;
