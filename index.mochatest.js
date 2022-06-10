import { createRequire } from "node:module";
import chai from "chai";
import {
  getFakeProduct,
  getFakeProductToChange,
} from "./src/components/products/productFaker/index.js";

let require = createRequire(import.meta.url);

const request = require("./node_modules/supertest")("http://localhost:8080");
const expect = chai.expect;

describe("All tests...", function () {
  describe("GET /api/products", function () {
    it("Obtener productos", async () => {
      let response = await request.get("/api/productos");
      expect(response.status).to.eql(200);
      console.log("----------Todos los productos----------");
      console.log(response.body);
    });
  });

  describe("POST /api/products", function () {
    it("Debe devolver nuevo producto", async function () {
      let product = getFakeProduct();
      let response = await request.post("/api/productos").send(product);
      const productResponse = response.body;
      expect(productResponse).to.include.keys(
        "_id",
        "title",
        "price",
        "thumbnail"
      );
      expect(productResponse.title).to.eql(product.title);
      expect(productResponse.price).to.eql(product.price);
      expect(productResponse.thumbnail).to.eql(product.thumbnail);
      console.log("----------Producto creado----------");
      console.log(productResponse);
    });
  });

  describe("PUT", function () {
    it("Debe devolver producto cambiado", async function () {
      let responseProducts = await request.get("/api/productos");
      let products = responseProducts.body;
      let id = products[1]._id;
      let product = getFakeProductToChange();
      let response = await request.put(`/api/productos/${id}`).send(product);
      expect(response.status).to.eql(200);
      const productResponse = response.body;
      expect(productResponse).to.include.keys(
        "_id",
        "title",
        "price",
        "thumbnail"
      );
      expect(productResponse.price).to.eql(product.price);
      expect(productResponse.thumbnail).to.eql(product.thumbnail);
      console.log("----------Producto anterior----------");
      console.log(products[1]);
      console.log("----------Producto cambiado----------");
      console.log(productResponse);
    });
  });

  describe("DELETE", function () {
    it("Debe devolver id del producto eliminado", async function () {
      let responseProducts = await request.get("/api/productos");
      let products = responseProducts.body;
      let id = products[1]._id;
      let response = await request.delete(`/api/productos/${id}`);
      expect(response.status).to.eql(200);
      const productResponse = response.body;
      expect(productResponse).to.eql(id);
      console.log("----------Producto eliminado----------");
      console.log(products[1]);
    });
  });
});
