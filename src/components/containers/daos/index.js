import messagesDaoFile from "./messagesContainer/messagesDaoFile.js";
import messagesDaoMemory from "./messagesContainer/messagesDaoMemory.js";
import messagesDaoMongodb from "./messagesContainer/messagesDaoMongo.js";
import productsDaoFile from "./productsContainer/productsDaoFile.js";
import productsDaoMemory from "./productsContainer/productsDaoMemory.js";
import productsDaoMongodb from "./productsContainer/productsDaoMongodb.js";
import { config } from "../../../config/index.js";

let container_type = config.container_type;

export default class Factory {
  createProductsDaoDB() {
    console.log(container_type);
    if (container_type == "file") return productsDaoFile.getInstance();
    if (container_type == "memory") return productsDaoMemory.getInstance();
    if (container_type == "mongodb") return productsDaoMongodb.getInstance();
  }
  createMessagesDaoDB() {
    if (container_type == "file") return messagesDaoFile.getInstance();
    if (container_type == "memory") return messagesDaoMemory.getInstance();
    if (container_type == "mongodb") return messagesDaoMongodb.getInstance();
  }
}
