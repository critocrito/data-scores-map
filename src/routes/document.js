// @flow
import Router from "koa-router";
import {list, show} from "../lib/documents";

const router = new Router()
  .post("list documents", "/documents", async ctx => {
    const ids = ctx.request.body.ids || [];
    const result = await list(ids);
    return ctx.ok(result);
  })
  .get("show document", "/documents/:docId", async ctx => {
    const {docId} = ctx.params;
    const result = await show(docId);
    return ctx.ok([result]);
  });

export default router;
