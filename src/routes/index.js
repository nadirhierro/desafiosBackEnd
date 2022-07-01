import combineRouters from "koa-combine-routers";
import routerMessages from "./API/messages/index.js";
import routerProducts from "./API/products/index.js";

const router = combineRouters(routerMessages, routerProducts);

export default router;
