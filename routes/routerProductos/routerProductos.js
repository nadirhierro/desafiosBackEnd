import express from "express";
import Products from "./products.js";

const { Router } = express;

const products = new Products();

let routerProductos = new Router();

routerProductos.get("/", (req, res, next) => {
  res.render("tabla", { products: products.products });
});

routerProductos.post("/", (req, res, next) => {
  let product = req.body;
  let newProduct = products.save(product);
  res.redirect("/");
});

routerProductos.get("/:id", (req, res, next) => {
  let { id } = req.params;
  let product = products.find(Number(id));
  if (product) {
    res.json(product);
  } else {
    res.json({ error: `No existe un producto con el id ${id}` });
  }
});

routerProductos.put("/:id", (req, res, next) => {
  let { id } = req.params;
  let newData = req.body;
  let productChanged = products.change(Number(id), newData);
  if (productChanged) {
    res.json({ modificado: productChanged });
  } else {
    res.json({ error: `No existe un producto con el id ${id}` });
  }
});
routerProductos.delete("/:id", (req, res, next) => {
  let { id } = req.params;
  let deleted = products.delete(Number(id));
  if (deleted) {
    res.json(`El producto con id ${id} fue eliminado`);
  } else {
    res.json(`No existe un producto con el id ${id}`);
  }
});

export default routerProductos;
