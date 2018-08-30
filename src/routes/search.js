// @flow
import Router from "koa-router";
import {search} from "../lib/search";

const router = new Router().post("search", "/", async (ctx) => {
  const {elastic} = ctx;
  const {q, from, size, filters} = ctx.request.body;
  if (!q || q === "") ctx.ok({data: [], total: 0});
  const result = await search(q, from || 0, size || 30, filters || {}, elastic);
  return ctx.ok(result);
});

export default router;
