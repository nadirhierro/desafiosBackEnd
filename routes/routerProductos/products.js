export default class Products {
  constructor() {
    this.products = [];
  }
  find(id) {
    return this.products.find((product) => product.id == id);
  }
  save(obj) {
    let id = 1;
    if (this.products.length > 0) {
      let ids = this.products.map((product) => product.id);
      id = Math.max.apply(null, ids) + 1;
    }
    let newObject = {
      id: id,
      ...obj,
    };
    this.products.push(newObject);
    return newObject;
  }
  change(id, obj) {
    let productToChange = this.products.find((product) => product.id == id);
    let newProduct = {};
    if (productToChange) {
      this.products.forEach((product) => {
        if (product.id == id) {
          product.title = obj.title;
          product.price = obj.price;
          product.thumbnail = obj.thumbnail;
          newProduct = product;
        }
      });
      return newProduct;
    } else {
      return null;
    }
  }
  delete(id) {
    let productToDelete = this.products.find((product) => product.id == id);
    if (productToDelete) {
      let index = this.products.indexOf(productToDelete);
      this.products.splice(index, 1);
      return id;
    } else {
      return null;
    }
  }
}
