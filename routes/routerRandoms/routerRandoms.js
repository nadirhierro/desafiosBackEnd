import express from "express";
import { fork } from "child_process";

const { Router } = express;

let routerRandoms = new Router();

routerRandoms.get("/", (req, res, next) => {
  let cant = req.query.cant;
  if (!cant) {
    cant = 100000000;
  }
  const forked = fork("./routes/routerRandoms/suma.js");
  forked.send(`${cant}`);
  forked.on("message", (calc) => {
    res.render("randoms", { randoms: calc });
  });
});

export default routerRandoms;
