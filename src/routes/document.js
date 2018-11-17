// @flow
import Router from "koa-router";
import {list, show} from "../lib/documents";

const router = new Router()
  .get("list documents", "/", async (ctx) => {
    const {elastic} = ctx;
    const exists = ctx.query.exists || [];
    const companies = ctx.query.companies || [];
    const systems = ctx.query.systems || [];
    const authorities = ctx.query.authorities || [];
    const departments = ctx.query.departments || [];
    const sources = ctx.query.sources || [];
    const from = ctx.query.from || 0;
    const size = ctx.query.size || 0;
    const result = await list(
      Array.isArray(exists) ? exists : [exists],
      parseInt(from, 10),
      parseInt(size, 10),
      {
        companies: Array.isArray(companies) ? companies : [companies],
        systems: Array.isArray(systems) ? systems : [systems],
        authorities: Array.isArray(authorities) ? authorities : [authorities],
        departments: Array.isArray(departments) ? departments : [departments],
        sources: Array.isArray(sources) ? sources : [sources],
      },
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
