import apiProducts from "./services/apiProducts.js";

let products = new apiProducts();

// Clase ProductsController
export default class ProductsController {
  // Constructor que inicia el servicio
  constructor() {}

  // Método para pedir al servicio devolver todos los productos a través de req
  async getProducts(ctx, next) {
    try {
      let allProducts = await products.getProducts();
      ctx.body = { status: "success", products: allProducts };
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir al servicio guardar un producto a través de req
  async postProduct(ctx, next) {
    try {
      if (
        !ctx.request.body.title ||
        !ctx.request.body.price ||
        !ctx.request.body.thumbnail
      ) {
        ctx.response.status = 400;
        ctx.body = { status: "error", message: "Falta información" };
      } else {
        let product = ctx.request.body;
        let saved = await products.saveProduct(product);
        ctx.response.status = 201;
        ctx.body = {
          status: "success",
          newProduct: saved,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir al servicio obtener un producto a través de req
  async getProductById(ctx, next) {
    try {
      let id = ctx.params.id;
      let product = await products.getProductById(Number(id));
      if (product) {
        ctx.response.status = 201;
        ctx.body = { status: "success", mesage: product };
      } else {
        ctx.response.status = 400;
        ctx.body = {
          status: "error",
          message: `No existe un producto con el id ${id}`,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir al servicio cambiar un producto a través de req
  async changeProductById(ctx, next) {
    try {
      if (
        !ctx.request.body.title &&
        !ctx.request.body.price &&
        !ctx.request.body.thumbnail
      ) {
        ctx.response.status = 400;
        ctx.body = {
          status: "error",
          message: `No existe un producto con el id ${id}`,
        };
      } else {
        let id = ctx.params.id;
        let newData = ctx.request.body;
        let productChanged = await products.changeProduct(Number(id), newData);
        if (productChanged) {
          ctx.response.status = 201;
          ctx.body = {
            status: "success",
            newProductData: productChanged,
          };
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Método para pedir a servicio eliminar un producto a través de req
  async deleteProductById(ctx, next) {
    try {
      let id = ctx.params.id;
      let deleted = await products.deleteProduct(Number(id));
      if (deleted) {
        ctx.response.status = 201;
        ctx.body = {
          status: "success",
          mesage: `Producto con id ${id} eliminado`,
        };
      } else {
        ctx.response.status = 400;
        ctx.body = {
          status: "error",
          message: `No existe un producto con el id ${id}`,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }
}
