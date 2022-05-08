import express from "express";
import Products from "./products.js";
import ProductsTest from "./products-test.js";
import logger from "../../utils/loggers/log4js.js";

const { Router } = express;

const products = new Products();
const productsFake = new ProductsTest();

let routerProductos = new Router();

routerProductos.get("/", async (req, res, next) => {
  try {
    let allProducts = productsFake.getProducts();
    res.json(allProducts);
  } catch (err) {
    console.log(err);
  }
});

routerProductos.post("/", async (req, res, next) => {
  try {
    let product = req.body;
    let newProduct = await products.save(product);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

routerProductos.get("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let product = await products.find(Number(id));
    if (product) {
      res.json(product);
    } else {
      logger.error(
        `Path: ${req.originalUrl}, Method: ${req.method} No existe un producto con el id ${id}`
      );
      res.json({ error: `No existe un producto con el id ${id}` });
    }
  } catch (err) {
    console.log(err);
  }
});

routerProductos.put("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let newData = req.body;
    let productChanged = await products.change(Number(id), newData);
    if (productChanged) {
      res.json({ modificado: productChanged });
    } else {
      logger.error(
        `Path: ${req.originalUrl}, Method: ${req.method} No existe un producto con el id ${id}`
      );
      res.json({ error: `No existe un producto con el id ${id}` });
    }
  } catch (err) {
    console.log(err);
  }
});

routerProductos.delete("/:id", async (req, res, next) => {
  try {
    let { id } = req.params;
    let deleted = products.delete(Number(id));
    if (deleted) {
      res.json(`El producto con id ${id} fue eliminado`);
    } else {
      logger.error(
        `Path: ${req.originalUrl}, Method: ${req.method} No existe un producto con el id ${id}`
      );
      res.json(`No existe un producto con el id ${id}`);
    }
  } catch (err) {
    console.log(err);
  }
});

export default routerProductos;
