import { db_knex_sqlite3 } from "../../config/database.js";
import moment from "moment";

export default class Messages {
  constructor() {
    this.db_knex = db_knex_sqlite3;
    this.table = "messages";
  }

  async getAll() {
    try {
      let data = await this.db_knex.from(this.table);
      if (data.length > 0) {
        return data;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err);
    }
  }

  async save(obj) {
    try {
      let newObj = {
        timestamp: moment().format("DD/MM/YYYY HH:MM:SS"),
        ...obj,
      };
      let saved = await this.db_knex.from(this.table).insert(newObj);
      console.log(saved);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
