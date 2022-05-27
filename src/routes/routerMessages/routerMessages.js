import express from "express";
import MessagesController from "../../components/messages/index.js";

const { Router } = express;

let controller = new MessagesController();

let routerMessages = new Router();

routerMessages.get("/", controller.getMessages);

routerMessages.post("/", controller.postMessages);

export default routerMessages;
