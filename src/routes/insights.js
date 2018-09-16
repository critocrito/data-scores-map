// @flow
import Router from "koa-router";
import {companiesAndSystems, authorities, departments} from "../lib/insights";

const router = new Router()
  .get("companiesSystems", "/companies-systems", async (ctx) => {
    const {elastic, companies, systems} = ctx;
    const result = await companiesAndSystems(companies, systems, elastic);
    return ctx.ok(result);
  })
  .get("authorities", "/authorities", async (ctx) => {
    const {elastic} = ctx;
    const result = await authorities(elastic);
    return ctx.ok(result);
  })
  .get("departments", "/departments", async (ctx) => {
    const {elastic} = ctx;
    const result = await departments(elastic);
    return ctx.ok(result);
  });

export default router;
