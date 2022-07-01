import Router from "koa-router";
import ProductsController from "../../../components/products/index.js";

let controller = new ProductsController();

const routerProducts = new Router({ prefix: "/api/products" });

routerProducts.get("/", controller.getProducts);

routerProducts.post("/", controller.postProduct);

routerProducts.get("/:id", controller.getProductById);

routerProducts.put("/:id", controller.changeProductById);

routerProducts.delete("/:id", controller.deleteProductById);

export default routerProducts;
