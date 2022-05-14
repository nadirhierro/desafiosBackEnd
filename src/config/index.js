import dotenv from "dotenv";
import _yargs from "yargs";
dotenv.config({ silent: true });

// Yargs
const yargs = _yargs(process.argv.slice(2));

// Seteo el puerto default y limpio los args
const args = yargs.default({
  port: process.env.DEFAULT_PORT,
  mode: process.env.MODE,
}).argv;
delete args["_"];
delete args["$0"];

console.log(args);

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: args.port,
  mode: args.mode,
  host: process.env.HOST,
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
  mongoAdvancedOptions: { useNewUrlParser: true, useUnifiedTopology: true },
};

export { config, db };
