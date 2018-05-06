// @flow
import Router from "koa-router";
import {list, show} from "../lib/city";

const router = new Router()
  .get("cities", "/cities", async ctx => {
    const result = await list();
    return ctx.ok(result);
  })
  .get("city", "/cities/:county/:name", async ctx => {
    const {name, county} = ctx.params;
    const result = await show(name, county);
    return ctx.ok(result);
  });

export default router;
