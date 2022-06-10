import axios from "axios";
import {
  getFakeProduct,
  getFakeProductToChange,
} from "./src/components/products/productFaker/index.js";

class ProductTest {
  constructor() {}

  async getProducts() {
    try {
      console.log("-------------Obteniendo productos-------------");
      let response = await axios.get("http://localhost:8080/api/productos");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async saveProduct() {
    try {
      console.log("-------------Creando producto-------------");
      let fakeProduct = getFakeProduct();
      let response = await axios.post(
        "http://localhost:8080/api/productos",
        fakeProduct
      );
      console.log("Producto creado:");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async changeProduct(position) {
    try {
      let products = await axios.get("http://localhost:8080/api/productos");
      let id = products.data[position]._id;
      console.log("-------------Cambiando producto-------------");
      let fakeNewData = getFakeProductToChange();
      let response = await axios.put(
        `http://localhost:8080/api/productos/${id}`,
        fakeNewData
      );
      console.log("Producto cambiado:");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteProduct(position) {
    try {
      let products = await axios.get("http://localhost:8080/api/productos");
      let id = products.data[position]._id;
      console.log("-------------Borrando producto-------------");
      let response = await axios.delete(
        `http://localhost:8080/api/productos/${id}`
      );
      console.log("Producto borrado:");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  }
}

let Test = new ProductTest();

(async () => {
  try {
    await Test.saveProduct();
    await Test.saveProduct();
    await Test.changeProduct(1);
    await Test.saveProduct();
    await Test.deleteProduct(2);
    await Test.saveProduct();
    await Test.getProducts();
    await Test.deleteProduct(1);
  } catch (err) {
    console.log(err);
  }
})();
