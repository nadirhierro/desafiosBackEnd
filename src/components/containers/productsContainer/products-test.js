import faker from "faker";

export default class ProductsTest {
  constructor() {}

  getProducts() {
    let products = [];
    for (let i = 0; i < 5; i++) {
      let product = {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(600, 600),
      };
      products.push(product);
    }
    return products;
  }
}
