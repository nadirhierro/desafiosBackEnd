import Factory from "../../containers/daos/index.js";

let factory = new Factory();
export default class ProductsService {
  constructor() {
    this.dao = factory.createProductsDaoDB();
  }

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
