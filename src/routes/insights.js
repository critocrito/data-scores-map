// @flow
import Router from "koa-router";
import {keywords, companiesAndSystems} from "../lib/insights";

const router = new Router()
  .get("keywords", "/keywords", async (ctx) => {
    const {elastic} = ctx;
    const result = await keywords(elastic);
    return ctx.ok(result);
  })
  .get("companiesSystems", "/companies-systems", async (ctx) => {
    const {elastic, companies, systems} = ctx;
    const result = await companiesAndSystems(companies, systems, elastic);
    return ctx.ok(result);
  });

export default router;
