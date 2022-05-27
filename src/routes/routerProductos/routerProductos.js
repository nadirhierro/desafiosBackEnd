import express from "express";
import ProductsController from "../../components/products/index.js";

let controller = new ProductsController();

const { Router } = express;

let routerProductos = new Router();

routerProductos.get("/", controller.getProducts);

routerProductos.post("/", controller.postProduct);

routerProductos.get("/:id", controller.getProductById);

routerProductos.put("/:id", controller.changeProductById);

routerProductos.delete("/:id", controller.deleteProductById);

export default routerProductos;
