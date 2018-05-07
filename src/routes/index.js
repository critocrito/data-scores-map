// @flow
import Router from "koa-router";

import city from "./city";
import unit from "./unit";
import council from "./council";

const router = new Router();

router.use("", city.routes());
router.use("", unit.routes());
router.use("", council.routes());

export default router;
