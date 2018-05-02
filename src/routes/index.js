import Router from "koa-router";

import root from "./root";
import city from "./city";

const router = new Router();

router.use("", root.routes());
router.use("", city.routes());

export default router;
