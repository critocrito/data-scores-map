// @flow
import Router from "koa-router";
import {search} from "../lib/search";

const router = new Router().get("search", "/search", async ctx => {
  const {q, limit} = ctx.query;
  const result = await search(q, limit);
  return ctx.ok(result);
});

export default router;
