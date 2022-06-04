import ProductsService from "./services/productsService.js";
import logger from "../../utils/loggers/log4js.js";

// Clase ProductsController
export default class ProductsController {
  // Constructor que inicia el servicio
  constructor() {
    this.products = new ProductsService();
  }

  // Método para pedir al servicio devolver todos los productos a través de req
  async getProducts(req, res, next) {
    try {
      let allProducts = await this.products.getProducts();
      res.json(allProducts);
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir al servicio guardar un producto a través de req
  async postProduct(req, res, next) {
    try {
      let product = req.body;
      await this.products.save(product);
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir al servicio obtener un producto a través de req
  async getProductById(req, res, next) {
    try {
      let { id } = req.params;
      let product = await this.products.find(Number(id));
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
      let productChanged = await this.products.change(Number(id), newData);
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

  // Método para pedir a servicio eliminar un producto a través de req
  async deleteProductById(req, res, next) {
    try {
      let { id } = req.params;
      let deleted = this.products.delete(Number(id));
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
