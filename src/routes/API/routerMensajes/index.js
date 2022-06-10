import express from "express";
import MessagesController from "../../../components/messages/index.js";

const { Router } = express;

let controller = new MessagesController();

let routerMensajes = new Router();

routerMensajes.get("/", controller.getMessages);

routerMensajes.post("/", controller.postMessages);

export default routerMensajes;
