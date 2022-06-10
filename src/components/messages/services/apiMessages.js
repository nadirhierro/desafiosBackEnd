import daoFactory from "../../containers/daos/index.js";
import Messages from "../../../models/messages/index.js";
import {
  normalize,
  posts,
} from "../../../utils/messagesNormalizr/messagesNormalizr.js";

// Inicio la daoFactory
let factory = new daoFactory();

// Clase MessagesService
export default class apiMessages {
  // Inserto el repositorio en su constructor
  constructor() {
    this.messages = factory.createMessagesDaoDB();
  }

  static getValidation(message) {
    try {
      Messages.validate(message);
    } catch (err) {
      throw new Error(
        "El mensaje posee un formato inválido o falta información" +
          err.details[0].message
      );
    }
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
      this.getValidation(data);
      let saved = await this.messages.save(data);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
