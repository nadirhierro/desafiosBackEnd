import Factory from "../../containers/daos/index.js";
import message from "../DTO/index.js";

let factory = new Factory();

let db = factory.createMessagesDaoDB();
export default class messagesRepository {
  constructor() {
    this.dao = factory.createMessagesDaoDB();
  }

  async getMessages() {
    try {
      const dtos = await this.dao.getAll();
      let data = dtos.messages.map((dto) => {
        return new message(
          dto.id,
          dto.timestamp,
          dto.author.email,
          dto.author.name,
          dto.author.surname,
          dto.author.age,
          dto.author.alias,
          dto.author.avatar,
          dto.message
        );
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async saveMessage(data) {
    try {
      const dto = new message(data);
      return this.dao.save(dto);
    } catch (err) {
      console.log(err);
    }
  }
}
