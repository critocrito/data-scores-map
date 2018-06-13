// @flow
import Router from "koa-router";

import document from "./document";
import council from "./council";
import search from "./search";

const router = new Router();

router.use("/api", document.routes());
router.use("/api", council.routes());
router.use("/api", search.routes());

export default router;
