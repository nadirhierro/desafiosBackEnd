import { db_knex_mysql } from "../../../config/database.js";

export default class Products {
  constructor() {
    this.db_knex = db_knex_mysql;
    this.table = "products";
  }

  async getAll() {
    try {
      let products = await this.db_knex.from(this.table);
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
      let product = await this.db_knex.from(this.table).where("id", "=", id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async save(product) {
    try {
      let saved = await this.db_knex.from(this.table).insert(product);
      console.log(saved);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }

  async change(id, product) {
    try {
      let changed = await this.db_knex
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
      let deleted = await this.db_knex
        .from(this.table)
        .where("id", "=", id)
        .del();
      console.log(deleted);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
