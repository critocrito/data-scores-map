// @flow
import Router from "koa-router";
import {toId} from "../lib/utils";

const router = new Router()
  .get("predictive-analytics", "/predictive-analytics", async (ctx) => {
    const {locationsSkyNews} = ctx;
    return ctx.ok(
      Object.values(
        locationsSkyNews.reduce(
          (memo, {name, link, systems, notes, extract, location}) => {
            const entry =
              memo[name] == null
                ? {name, link, location, id: toId(name), count: 0, systems: []}
                : memo[name];

            const newEntry = Object.assign({}, entry, {
              count: entry.count + 1,
              systems: entry.systems.concat({name: systems, notes, extract}),
            });

            return Object.assign(memo, {[name]: newEntry});
          },
          {},
        ),
      ),
    );
  })
  .get(
    "case-studies-entities",
    "/case-studies-entities/:caseStudy",
    async (ctx) => {
      const {caseStudiesEntities} = ctx;
      const {caseStudy} = ctx.params;
      if (caseStudiesEntities[caseStudy] == null) return ctx.notFound();
      return ctx.ok([caseStudiesEntities[caseStudy]]);
    },
  )
  .get("foi-entities", "/foi-entities/:foiRequest", async (ctx) => {
    const {foiEntities} = ctx;
    const {foiRequest} = ctx.params;
    if (foiEntities[foiRequest] == null) return ctx.notFound();
    return ctx.ok([foiEntities[foiRequest]]);
  });

export default router;
