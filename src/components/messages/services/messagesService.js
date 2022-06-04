import messagesRepository from "../Repository/messagesRepository.js";
import {
  normalize,
  posts,
} from "../../../utils/messagesNormalizr/messagesNormalizr.js";

// Clase MessagesService
export default class MessagesService {
  // Inserto el repositorio en su constructor
  constructor() {
    this.messages = new messagesRepository();
  }

  // Método para tomar mensajes del repositorio y devolverlos normalizados al controlador
  async getMessages() {
    try {
      let allMessages = await this.messages.getMessages();
      const normalizedData = normalize(allMessages, posts);
      return normalizedData;
    } catch (err) {
      console.log(err);
    }
  }

  // Método para guardar un mensaje
  async saveMessage(data) {
    try {
      let saved = await this.messages.save(data);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
