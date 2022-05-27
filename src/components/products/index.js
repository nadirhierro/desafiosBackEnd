import ProductsService from "./services/productsService.js";
import logger from "../../utils/loggers/log4js.js";

const products = new ProductsService();

export default class ProductsController {
  constructor() {}
  async getProducts(req, res, next) {
    try {
      let allProducts = products.getProducts();
      res.json(allProducts);
    } catch (err) {
      console.log(err);
    }
  }

  async postProduct(req, res, next) {
    try {
      let product = req.body;
      await products.save(product);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(req, res, next) {
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
  }

  async changeProductById(req, res, next) {
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
  }

  async deleteProductById(req, res, next) {
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
  }
}
