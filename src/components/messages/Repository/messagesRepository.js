import Factory from "../../containers/daos/index.js";
import messageDto from "../DTO/index.js";

let factory = new Factory();

export default class messagesRepository {
  constructor() {
    this.dao = factory.createMessagesDaoDB();
  }

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

  async saveMessage(data) {
    try {
      const dto = new messageDto(data);
      return this.dao.save(dto);
    } catch (err) {
      console.log(err);
    }
  }
}
