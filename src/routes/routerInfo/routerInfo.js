import express from "express";
import gzip from "compression";
import Info from "../../components/info/index.js";

const { Router } = express;

let controller = new Info();

let routerInfo = new Router();

routerInfo.get("/", controller.getInfo);

// Ruta para comprimido

routerInfo.get("/zipped", gzip(), controller.getInfo);

export default routerInfo;
