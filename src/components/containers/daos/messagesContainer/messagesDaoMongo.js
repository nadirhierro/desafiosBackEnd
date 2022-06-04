import mongodbContainer from "../../mongodbContainer.js";
import { messageModel } from "../../../../models/index.js";
import moment from "moment";
// Instancia empieza en null

let instance = null;

// Clase messagesMongodb extensión de mongodbContainer
// Guarda los mensajes uno a uno, sin el objeto {id: "messages", messages:{},{}...,{}}
// Es decir, guarda {message1,message2,message3...,messageX}
// Se crea un método para devolver toda la data con la estructura {id: "messages", messages:{},{}...,{}}
export default class messagesDaoMongodb extends mongodbContainer {
  constructor() {
    super();
    this.model = messageModel; // Defino el model de mensajes
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new messagesDaoMongodb();
    }
    return instance;
  }

  // Método para guardar un mensaje
  async save(obj) {
    try {
      let newObj = {
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      let objModel = new this.model(newObj);
      let saveObj = await objModel.save();
      return saveObj;
    } catch (err) {
      console.log(err);
    }
  }

  // Método para devolver los mensajes con la estructura requerida para normalizar
  async getAll() {
    try {
      let messages = this.model.find({});
      return { id: "messages", messages: messages };
    } catch (err) {
      console.log(err);
    }
  }
}
