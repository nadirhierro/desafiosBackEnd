import apiProducts from "./services/apiProducts.js";
import logger from "../../utils/loggers/log4js.js";

let products = new apiProducts();

// Clase ProductsController
export default class ProductsController {
  // Constructor que inicia el servicio
  constructor() {}

  // Método para pedir al servicio devolver todos los productos a través de req
  async getProducts(req, res, next) {
    try {
      let allProducts = await products.getProducts();
      res.json(allProducts);
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir al servicio guardar un producto a través de req
  async postProduct(req, res, next) {
    try {
      let product = req.body;
      let saved = await products.saveProduct(product);
      res.json(saved);
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir al servicio obtener un producto a través de req
  async getProductById(req, res, next) {
    try {
      let { id } = req.params;
      let product = await products.getProductById(Number(id));
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

  // Método para pedir al servicio cambiar un producto a través de req
  async changeProductById(req, res, next) {
    try {
      let { id } = req.params;
      let newData = req.body;
      console.log(newData);
      let productChanged = await products.changeProduct(Number(id), newData);
      if (productChanged) {
        console.log(productChanged);
        res.json(productChanged);
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

  // Método para pedir a servicio eliminar un producto a través de req
  async deleteProductById(req, res, next) {
    try {
      let { id } = req.params;
      let deleted = await products.deleteProduct(Number(id));
      if (deleted) {
        res.json(deleted);
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
