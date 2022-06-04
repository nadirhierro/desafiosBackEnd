import messagesDaoFile from "./messagesContainer/messagesDaoFile.js";
import messagesDaoMemory from "./messagesContainer/messagesDaoMemory.js";
import messagesDaoMongodb from "./messagesContainer/messagesDaoMongo.js";
import productsDaoFile from "./productsContainer/productsDaoFile.js";
import productsDaoMemory from "./productsContainer/productsDaoMemory.js";
import productsDaoMongodb from "./productsContainer/productsDaoMongodb.js";
import { config } from "../../../config/index.js";

// Container type desde config-args
let container_type = config.container_type;

// Clase daoFactory devuelve una instancia del container elegido
export default class daoFactory {
  // Método para devolver productsDaoDb
  createProductsDaoDB() {
    console.log(container_type);
    if (container_type == "file") return productsDaoFile.getInstance();
    if (container_type == "memory") return productsDaoMemory.getInstance();
    if (container_type == "mongodb") return productsDaoMongodb.getInstance();
  }

  // Método para devolver messagesDaoDb
  createMessagesDaoDB() {
    if (container_type == "file") return messagesDaoFile.getInstance();
    if (container_type == "memory") return messagesDaoMemory.getInstance();
    if (container_type == "mongodb") return messagesDaoMongodb.getInstance();
  }
}
