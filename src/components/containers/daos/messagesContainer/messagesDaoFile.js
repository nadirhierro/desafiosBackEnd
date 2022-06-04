import fileContainer from "../../fileContainer.js";
import moment from "moment";

let instance = null;

export default class messagesDaoFile extends fileContainer {
  constructor(fileName) {
    super(fileName);
    this.fileName = "./src/data/messages.json";
  }

  static getInstance() {
    if (!instance) {
      instance = new messagesDaoFile();
    }
    return instance;
  }

  // Guardar productos
  async save(obj) {
    try {
      let object = await this.getAll();
      let data = object.messages;
      let id = 1;
      if (data.length > 0) {
        let ids = data.map((item) => item.id);
        id = Math.max.apply(null, ids) + 1;
      }
      let newObject = {
        id: id,
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      data.push(newObject);
      await this.write({ id: "messages", messages: data });
      return id;
    } catch (err) {
      return err;
    }
  }
}
