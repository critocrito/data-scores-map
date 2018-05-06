// @flow
import Router from "koa-router";

import city from "./city";
import unit from "./unit";

const router = new Router();

router.use("", city.routes());
router.use("", unit.routes());

export default router;
