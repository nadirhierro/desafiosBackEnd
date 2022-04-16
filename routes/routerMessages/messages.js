import * as fs from "node:fs";
import fileContainer from "../../components/containers/fileContainer.js";
import {
  normalize,
  posts,
} from "../../utils/messagesNormalizr/messagesNormalizr.js";
import moment from "moment";
import util from "util";

// Función print
function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

export default class Messages extends fileContainer {
  constructor(fileName) {
    super(fileName);
    this.fileName = "./data/messages.json";
  }

  // Normalizar productos para el front
  async getAllNormalized() {
    try {
      let data = await fs.promises.readFile(`${this.fileName}`, "utf-8");
      if (data) {
        const dataParsed = JSON.parse(data);
        const normalizedData = normalize(dataParsed, posts);
        return normalizedData;
      } else {
        return [];
      }
    } catch (err) {
      return err;
    }
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
