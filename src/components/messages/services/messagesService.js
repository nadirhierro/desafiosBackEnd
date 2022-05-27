import Messages from "../../containers/messagesContainer/index.js";

const messages = new Messages();

export default class MessagesService {
  constructor() {}

  async getMessages() {
    try {
      let allMessages = await messages.getAllNormalized();
      return allMessages;
    } catch (err) {
      console.log(err);
    }
  }

  async saveMessage() {
    try {
      let saved = await messages.save(data);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
