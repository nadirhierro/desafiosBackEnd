import MessagesService from "./services/messagesService.js";

// Clase MessagesController
export default class MessagesController {
  // Constructor que inicia el MessagesService
  constructor() {
    this.messages = new MessagesService();
  }

  // Método para devolver todos los mensajes a través de req
  async getMessages(req, res, next) {
    try {
      let data = await this.messages.getMessages();
      console.log(data);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  // Método para guardar un mensaje a través de req
  async postMessages(req, res, next) {
    try {
      let data = req.body;
      let saved = await this.messages.saveMessage(data);
      if (saved) {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
}
