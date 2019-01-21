// @flow
import Router from "koa-router";

import document from "./document";
import search from "./search";
import insights from "./insights";
import stats from "./stats";
import impact from "./impact";

const router = new Router();

router.use("/documents", document.routes());
router.use("/search", search.routes());
router.use("/insights", insights.routes());
router.use("/stats", stats.routes());
router.use("/impacts", impact.routes());

export default router;
