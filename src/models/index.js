import mongoose from "../config/mongoDB.js";
import messageSchema from "./schemas/messages.js";
import productSchema from "./schemas/products.js";

const { Schema, model } = mongoose;

let ProductSchema = new Schema(productSchema);
let productModel = new model("productsDesafios", ProductSchema);

let MessageSchema = new Schema(messageSchema);
let messageModel = new model("messages", MessageSchema);

export { productModel, messageModel };
