// @flow
import Router from "koa-router";
import {list, show} from "../lib/documents";
import {searchByIds} from "../lib/search";

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
  })
  .post("case-studies-entities", "/case-studies/:caseStudy", async (ctx) => {
    const {caseStudiesEntities, elastic} = ctx;
    const {caseStudy} = ctx.params;
    const {from, size} = ctx.request.body;
    const filters =
      (ctx.request.body.filters || []).length === 0
        ? Object.keys(caseStudiesEntities[caseStudy])
        : ctx.request.body.filters;
    if (caseStudiesEntities[caseStudy] == null) return ctx.notFound();
    const ids = Array.from(
      filters.reduce((memo, filter) => {
        caseStudiesEntities[caseStudy][filter].forEach((id) => memo.add(id));
        return memo;
      }, new Set()),
    );
    const results = await searchByIds(ids, from, size, elastic);
    return ctx.ok(results);
  });

export default router;
