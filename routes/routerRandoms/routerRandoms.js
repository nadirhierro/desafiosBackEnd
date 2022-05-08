import express from "express";
import calcRandoms from "./randoms.js";
// import { fork } from "child_process";

const { Router } = express;

let routerRandoms = new Router();

// Tomo la cantidad por query, si no está definida la seteo en 100000000;

routerRandoms.get("/", (req, res, next) => {
  let cant = req.query.cant;
  if (!cant) {
    cant = 100000000;
  }
  // // Fork al calculo
  // const forked = fork("./routes/routerRandoms/randoms.js");
  // forked.send(`${cant}`);
  // forked.on("message", (calc) => {
  //   // Renderizo el resultado
  //   res.render("randoms", { randoms: calc });
  // });
  res.render("randoms", { randoms: calcRandoms(cant) });
});

export default routerRandoms;
