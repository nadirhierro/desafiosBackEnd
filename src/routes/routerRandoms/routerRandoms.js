import express from "express";
import RandomsController from "../../components/randoms/index.js";

let controller = new RandomsController();

const { Router } = express;

let routerRandoms = new Router();

routerRandoms.get("/", controller.getRandoms);

export default routerRandoms;
