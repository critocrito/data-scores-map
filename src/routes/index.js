// @flow
import Router from "koa-router";

import document from "./document";
import council from "./council";
import search from "./search";
import insights from "./insights";
import stats from "./stats";

const router = new Router();

router.use("/api", document.routes());
router.use("/api", council.routes());
router.use("/api", search.routes());
router.use("/api/insights", insights.routes());
router.use("/api/stats", stats.routes());

export default router;
