import express from "express";
import routerInfo from "./routerInfo/routerInfo.js";
import routerMessages from "./routerMessages/routerMessages.js";
import routerProductos from "./routerProductos/routerProductos.js";
import routerRandoms from "./routerRandoms/routerRandoms.js";
import routerRoot from "./routerRoot/routerRoot.js";

const { Router } = express;

let router = new Router();

// Rutas
router.use("/", routerRoot);
router.use("/productos", routerProductos);
router.use("/mensajes", routerMessages);
router.use("/info", routerInfo);
router.use("/api/randoms", routerRandoms);

export default router;
