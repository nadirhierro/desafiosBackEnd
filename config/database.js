import { db } from "./index.js";
import knex from "knex";

let mysql = knex({
  client: "mysql",
  connection: {
    ...db,
  },
  pool: { min: 0, max: 7 },
});

class Database {
  static client;
  constructor() {
    if (Database.client) {
      return Database.client;
    }
    Database.client = mysql;
    this.client = Database.client;
  }
}

let database = new Database();
let db_knex = database.client;

export default db_knex;
