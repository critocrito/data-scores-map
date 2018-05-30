// @flow
import Router from "koa-router";

import city from "./city";
import unit from "./unit";
import council from "./council";
import search from "./search";

const router = new Router();

router.use("/api", city.routes());
router.use("/api", unit.routes());
router.use("/api", council.routes());
router.use("/api", search.routes());

export default router;
