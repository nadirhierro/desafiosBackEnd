import Products from "./products.js";
import express from "express";

const products = new Products();

const { Router } = express;

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let routerProductos = new Router();

routerProductos.get("/", (req, res, next) => {
  res.json(products.products);
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

routerProductos.post("/", (req, res, next) => {
  let product = req.body;
  let newProduct = products.save(product);
  res.json({ agregado: newProduct });
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

app.use("/api/productos", routerProductos);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
