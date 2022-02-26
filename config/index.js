import dotenv from "dotenv";
dotenv.config({ silent: true });

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
};

let db = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

export { config, db };
