// @flow
import Router from "koa-router";
import {list, show} from "../lib/documents";

const router = new Router()
  .get("list documents", "/", async (ctx) => {
    const {elastic} = ctx;
    const exists = ctx.query.exists || [];
    const authorities = ctx.query.authorities || [];
    const from = ctx.query.from || 0;
    const size = ctx.query.size || 0;
    const result = await list(
      Array.isArray(exists) ? exists : [exists],
      Array.isArray(authorities) ? authorities : [authorities],
      parseInt(from, 10),
      parseInt(size, 10),
      elastic,
    );
    return ctx.ok(result);
  })
  .get("show document", "/:docId", async (ctx) => {
    const {elastic} = ctx;
    const {docId} = ctx.params;
    const result = await show(docId, elastic);
    return ctx.ok(result);
  });

export default router;
