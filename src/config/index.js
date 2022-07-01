import dotenv from "dotenv";
import _yargs from "yargs";
dotenv.config({ silent: true });

// Yargs
const yargs = _yargs(process.argv.slice(2));

// Seteo el puerto default y limpio los args
const args = yargs.default({
  port: process.env.PORT,
  mode: process.env.MODE,
  container_type: "file",
}).argv;
delete args["_"];
delete args["$0"];

console.log(args);

let config = {
  dev: process.env.NODE_ENV !== "production",
  port: args.port,
  host: process.env.DB_HOST,
  mode: args.mode,
  container_type: args.container_type,
};

export default config;
