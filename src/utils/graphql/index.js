import crypto from "crypto";
import moment from "moment";

class Product {
  constructor(id, { title, price, thumbnail }) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
  }
}

class Message {
  constructor(id, timestamp, { author, message }) {
    this.id = id;
    this.timestamp = timestamp;
    this.author = author;
    this.message = message;
  }
}

const ProductsArray = [];
const MessagesArray = [];

const funciones = {};

funciones.getProducts = ({ field, value }) => {
  const products = Object.values(ProductsArray);
  if (field && value) {
    return products.filter((product) => product[field] == value);
  } else {
    return products;
  }
};

funciones.getProductById = ({ id }) => {
  if (!ProductsArray[id]) throw new Error("No existe una persona con ese id");
  return ProductsArray[id];
};

funciones.createProduct = ({ data }) => {
  const id = crypto.randomBytes(10).toString("hex");
  const newProduct = new Product(id, data);
  ProductsArray[id] = newProduct;
  return newProduct;
};

funciones.changeProduct = ({ id, data }) => {
  if (!ProductsArray[id]) throw new Error("No existe una persona con ese id");
  const newProduct = new Product(id, data);
  ProductsArray[id] = newProduct;
  return newProduct;
};

funciones.deleteProduct = ({ id }) => {
  if (!ProductsArray[id]) throw new Error("No existe una persona con ese id");
  const productToDelete = ProductsArray[id];
  delete ProductsArray[id];
  return productToDelete;
};

funciones.getMessages = ({ field, value }) => {
  const messages = Object.values(MessagesArray);
  if (field && value) {
    return messages.filter((message) => message[field] == value);
  } else {
    return messages;
  }
};

funciones.createMessage = ({ data }) => {
  const id = crypto.randomBytes(10).toString("hex");
  const timestamp = moment().format("DD/MM/YYYY HH:MM:SS");
  const newMessage = new Message(id, timestamp, data);
  MessagesArray[id] = newMessage;
  return newMessage;
};

export default funciones;
