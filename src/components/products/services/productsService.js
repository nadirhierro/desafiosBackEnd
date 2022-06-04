import daoFactory from "../../containers/daos/index.js";

// Inicio la daoFactory
let factory = new daoFactory();

// Clase ProductsService
export default class ProductsService {
  // Constructor que solicita la instancia correspondiente
  constructor() {
    this.dao = factory.createProductsDaoDB();
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
      let changed = await this.dao.change(Number(id), newData);
      return changed;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      let deleted = await this.dao.delete(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
