// @flow
import Router from "koa-router";
import {categories, companiesAndSystems, authorities} from "../lib/insights";

const router = new Router()
  .get("categories", "/categories", async (ctx) => {
    const {elastic, categories: categoryList} = ctx;
    const result = await categories(categoryList, elastic);
    return ctx.ok(result);
  })
  .get("companiesSystems", "/companies-systems", async (ctx) => {
    const {elastic, companies, systems} = ctx;
    const result = await companiesAndSystems(companies, systems, elastic);
    return ctx.ok(result);
  })
  .get("authorities", "/authorities", async (ctx) => {
    const {elastic} = ctx;
    const result = await authorities(elastic);
    return ctx.ok(result);
  });

export default router;
