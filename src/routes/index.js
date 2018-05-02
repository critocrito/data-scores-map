import Router from "koa-router";

import root from "./root";

const router = new Router();

router.use("", root.routes());

export default router;
