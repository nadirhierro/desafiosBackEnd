import faker from "faker";

function getFakeProduct() {
  let product = {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.image(600, 600),
  };

  return product;
}

function getFakeProductToChange() {
  let product = {
    price: faker.commerce.price(),
    thumbnail: faker.image.image(600, 600),
  };
  return product;
}

export { getFakeProduct, getFakeProductToChange };
