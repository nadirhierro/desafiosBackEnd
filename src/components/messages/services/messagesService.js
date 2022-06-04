import messagesRepository from "../Repository/messagesRepository.js";
import {
  normalize,
  posts,
} from "../../../utils/messagesNormalizr/messagesNormalizr.js";

export default class MessagesService {
  constructor() {
    this.messages = new messagesRepository();
  }

  async getMessages() {
    try {
      let allMessages = await this.messages.getMessages();
      const normalizedData = normalize(allMessages, posts);
      return normalizedData;
    } catch (err) {
      console.log(err);
    }
  }

  async saveMessage(data) {
    try {
      let saved = await this.messages.save(data);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
