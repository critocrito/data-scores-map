// @flow
import Router from "koa-router";
import {keywords} from "../lib/insights";

const router = new Router().get("keywords", "/keywords", async (ctx) => {
  const {elastic} = ctx;
  const result = await keywords(elastic);
  return ctx.ok(result);
});

export default router;
