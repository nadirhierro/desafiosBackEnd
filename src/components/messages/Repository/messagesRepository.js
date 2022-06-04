import daoFactory from "../../containers/daos/index.js";
import messageDto from "../DTO/index.js";

// inicio daoFactory
let factory = new daoFactory();

// Clase messagesRepository
export default class messagesRepository {
  // Pido la instancia del Dao en el constructor
  constructor() {
    this.dao = factory.createMessagesDaoDB();
  }

  // Método getMessages que solicita al dao y devuelve el objeto correspondiente, con la estructura DTO
  async getMessages() {
    try {
      const dtos = await this.dao.getAll();
      if (dtos.length > 0) {
        let data = new messageDto(dtos.messages);
        return data;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Método para guardar un mensaje en dao, conservando la estructura DTO
  async saveMessage(data) {
    try {
      const dto = new messageDto(data);
      return this.dao.save(dto);
    } catch (err) {
      console.log(err);
    }
  }
}
