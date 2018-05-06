// @flow
import Router from "koa-router";

import city from "./city";

const router = new Router();

router.use("", city.routes());

export default router;
