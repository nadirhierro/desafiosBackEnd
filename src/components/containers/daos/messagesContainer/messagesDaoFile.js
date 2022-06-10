import fileContainer from "../../fileContainer.js";
import moment from "moment";
import Joi from "joi";

// Instancia empieza en null
let instance = null;

// Clase messagesFile extensión de fileContainer
export default class messagesDaoFile extends fileContainer {
  constructor(fileName) {
    super(fileName);
    this.fileName = "./src/data/messages.json"; // Defino el archivo
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new messagesDaoFile();
    }
    return instance;
  }

  // Guardar un mensaje conservando el objeto para normalización
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
