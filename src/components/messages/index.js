import MessagesService from "./services/messagesService.js";

const messages = new MessagesService();

export default class MessagesController {
  constructor() {}

  async getMessages(req, res, next) {
    try {
      let data = await messages.getMessages();
      console.log(data);
      res.json(data);
    } catch (err) {
      console.log(err);
    }
  }

  async postMessages(req, res, next) {
    try {
      let data = req.body;
      let saved = await messages.saveMessage(data);
      if (saved) {
        res.redirect("/");
      }
    } catch (err) {
      console.log(err);
    }
  }
}
