import express from "express";
import routerMensajes from "./routerMensajes/index.js";
import routerProductos from "./routerProductos/index.js";
import routerRandoms from "./routerRandoms/index.js";

const { Router } = express;

let routerApi = new Router();

routerApi.use("/productos", routerProductos);
routerApi.use("/mensajes", routerMensajes);
routerApi.use("/randoms", routerRandoms);

export default routerApi;
