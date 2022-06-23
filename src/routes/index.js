import express from "express";
import routerApi from "./API/index.js";
import routerInfo from "./routerInfo/routerInfo.js";
import routerRoot from "./routerRoot/routerRoot.js";
import { graphqlHTTP } from "express-graphql";
import schema from "../utils/graphql/schema.js";
import funciones from "../utils/graphql/index.js";

const { Router } = express;

let router = new Router();

// Rutas
router.use("/", routerRoot);
router.use("/api", routerApi);
router.use("/info", routerInfo);
router.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: { ...funciones },
    graphiql: true,
  })
);

export default router;
