import dotenv from "dotenv";
dotenv.config({ silent: true });

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT,
  sessionSecret: process.env.SESSION_SECRET,
  maxAge: process.env.TIEMPO_EXPIRACION,
  facebookID: process.env.FACEBOOK_APP_ID,
  facebookSecret: process.env.FACEBOOK_APP_SECRET,
};

let db = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  mongo_atlas: process.env.MONGO_ATLAS,
};

export { config, db };
