import daoFactory from "../../containers/daos/index.js";
import ProductsSchema from "../../../models/products/index.js";

// Inicio la daoFactory
let factory = new daoFactory();

// Clase ProductsService
export default class apiProducts {
  // Constructor que solicita la instancia correspondiente
  constructor() {
    this.dao = factory.createProductsDaoDB();
  }

  static getValidation(message, required) {
    try {
      ProductsSchema.validate(message, required);
    } catch (err) {
      throw new Error(
        "El mensaje posee un formato inválido o falta información" +
          err.details[0].message
      );
    }
  }

  // Método apra pedirle todos los productos al DAO
  async getProducts() {
    try {
      let products = await this.dao.getAll();
      if (products) {
        return products;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir guardar un producto al DAO
  async saveProduct(product) {
    try {
      apiProducts.getValidation(product, true);
      let saved = await this.dao.save(product);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      let product = await this.dao.getById(id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async changeProduct(id, newData) {
    try {
      apiProducts.getValidation(newData, false);
      let changed = await this.dao.change({ _id: Number(id), ...newData });
      console.log(newData);
      return changed;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      let deleted = await this.dao.deleteById(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
