import db_knex from "../../config/database.js";

export default class Products {
  constructor() {
    this.database = db_knex;
    this.table = "products";
  }

  async getAll() {
    try {
      let products = await this.database.from(this.table);
      let productsMapped = products.map((row) => {
        return {
          id: row.id,
          title: row.title,
          price: row.price,
          thumbnail: row.thumbnail,
        };
      });
      return productsMapped;
    } catch (err) {
      console.log(err);
    }
  }

  async find(id) {
    try {
      let product = await this.database.from(this.table).where("id", "=", id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async save(product) {
    try {
      let saved = await this.database.from(this.table).insert(product);
      console.log(saved);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }

  async change(id, product) {
    try {
      let changed = await this.database
        .from(this.table)
        .where("id", "=", id)
        .update(product);
      console.log(changed);
      return changed;
    } catch (err) {
      console.log(err);
    }
  }

  async delete(id) {
    try {
      let deleted = await this.database
        .from(this.table)
        .where("id", "=", id)
        .del();
      console.log(deleted);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
  // find(id) {
  //   return this.products.find((product) => product.id == id);
  // }
  // save(obj) {
  //   let id = 1;
  //   if (this.products.length > 0) {
  //     let ids = this.products.map((product) => product.id);
  //     id = Math.max.apply(null, ids) + 1;
  //   }
  //   let newObject = {
  //     id: id,
  //     ...obj,
  //   };
  //   this.products.push(newObject);
  //   return newObject;
  // }
  // change(id, obj) {
  //   let productToChange = this.products.find((product) => product.id == id);
  //   let newProduct = {};
  //   if (productToChange) {
  //     this.products.forEach((product) => {
  //       if (product.id == id) {
  //         product.title = obj.title;
  //         product.price = obj.price;
  //         product.thumbnail = obj.thumbnail;
  //         newProduct = product;
  //       }
  //     });
  //     return newProduct;
  //   } else {
  //     return null;
  //   }
  // }
  // delete(id) {
  //   let productToDelete = this.products.find((product) => product.id == id);
  //   if (productToDelete) {
  //     let index = this.products.indexOf(productToDelete);
  //     this.products.splice(index, 1);
  //     return id;
  //   } else {
  //     return null;
  //   }
  // }
}
