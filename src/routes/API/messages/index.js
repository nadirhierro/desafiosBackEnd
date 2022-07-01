import Router from "koa-router";
import MessagesController from "../../../components/messages/index.js";

let controller = new MessagesController();

const routerMessages = new Router({ prefix: "/api/messages" });

routerMessages.get("/", controller.getMessages);

routerMessages.post("/", controller.postMessages);

export default routerMessages;
