import express from "express";
import routerApi from "./API/index.js";
import routerInfo from "./routerInfo/routerInfo.js";
import routerRoot from "./routerRoot/routerRoot.js";

const { Router } = express;

let router = new Router();

// Rutas
router.use("/", routerRoot);
router.use("/api", routerApi);
router.use("/info", routerInfo);

export default router;
