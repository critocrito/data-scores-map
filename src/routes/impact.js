// @flow
import Router from "koa-router";
import {toId} from "../lib/utils";

const router = new Router().get("sky-news", "/sky-news", async (ctx) => {
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
});

export default router;
