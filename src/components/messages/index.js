import apiMessages from "./services/apiMessages.js";

let messages = new apiMessages();

// Clase MessagesController
export default class MessagesController {
  // Constructor que inicia el MessagesService
  constructor() {}

  // Método para devolver todos los mensajes a través de req
  async getMessages(ctx, next) {
    try {
      let data = await messages.getMessages();
      console.log(data);
      ctx.response.status = 201;
      ctx.body = { status: "success", allMessages: data };
    } catch (err) {
      console.log(err);
    }
  }

  // Método para guardar un mensaje a través de req
  async postMessages(ctx, next) {
    try {
      if (
        !ctx.request.body.author.email ||
        !ctx.request.body.author.alias ||
        !ctx.request.body.author.name ||
        !ctx.request.body.author.surname ||
        !ctx.request.body.author.age ||
        !ctx.request.body.author.avatar ||
        !ctx.request.body.message
      ) {
        ctx.reponse.status = 404;
        ctx.body = { status: "Error", message: "Falta información" };
      } else {
        let data = ctx.request.body;
        let saved = await messages.saveMessage(data);
        if (saved) {
          ctx.response.status = 201;
          ctx.body = { status: "saved", newMessage: saved };
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
