// @flow
import Router from "koa-router";
import {list, show} from "../lib/unit";

const router = new Router()
  .post("units", "/units", async ctx => {
    const ids = ctx.request.body.ids || [];
    const result = await list(ids);
    return ctx.ok(result);
  })
  .get("document details", "/documents/:docId", async ctx => {
    const {docId} = ctx.params;
    const result = await show(docId);
    return ctx.ok([result]);
  });

export default router;
