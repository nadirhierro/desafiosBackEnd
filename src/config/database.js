import { db } from "./index.js";
import knex from "knex";

let mysql = knex({
  client: "mysql",
  connection: {
    ...db,
  },
  pool: { min: 0, max: 7 },
});

let sqlite3 = knex({
  client: "sqlite3",
  connection: {
    filename: "./DB/ecommerce.sqlite",
  },
  useNullAsDefault: true,
});

class DatabaseProducts {
  static client;
  constructor() {
    if (DatabaseProducts.client) {
      return DatabaseProducts.client;
    }
    DatabaseProducts.client = mysql;
    this.client = DatabaseProducts.client;
  }
}

class DatabaseMessages {
  static client;
  constructor() {
    if (DatabaseMessages.client) {
      return DatabaseMessages.client;
    }
    DatabaseMessages.client = sqlite3;
    this.client = DatabaseMessages.client;
  }
}

let databaseMysql = new DatabaseProducts();
let db_knex_mysql = databaseMysql.client;

let databaseSqlite3 = new DatabaseMessages();
let db_knex_sqlite3 = databaseSqlite3.client;

export { db_knex_mysql, db_knex_sqlite3 };
