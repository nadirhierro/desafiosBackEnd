import Products from "../../containers/productsContainer/products.js";
import ProductsTest from "../../containers/productsContainer/products-test.js";

const products = new Products();
const productsFake = new ProductsTest();

export default class ProductsService {
  constructor() {}

  async getProducts() {
    try {
      let products = await productsFake.getProducts();
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async saveProduct(product) {
    try {
      let saved = await products.save(product);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      let product = await products.getProductById(id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async changeProduct(id, newData) {
    try {
      let changed = await products.change(Number(id), newData);
      return changed;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id) {
    try {
      let deleted = products.delete(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
