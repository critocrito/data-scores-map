// @flow
import Router from "koa-router";

import document from "./document";
import council from "./council";
import search from "./search";
import insights from "./insights";
import stats from "./stats";

const router = new Router();

router.use("/", document.routes());
router.use("/", council.routes());
router.use("/", search.routes());
router.use("/insights", insights.routes());
router.use("/stats", stats.routes());

export default router;
