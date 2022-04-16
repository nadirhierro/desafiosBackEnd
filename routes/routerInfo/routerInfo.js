import express from "express";

const { Router } = express;

let routerInfo = new Router();

// Presentación de la información solicitada

routerInfo.get("/", (req, res, next) => {
  let data = {
    args: process.argv.slice(2),
    platform: process.platform,
    nodejsv: process.version,
    rss: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    folder: process.cwd(),
  };
  res.render("info", { datos: data });
});

export default routerInfo;
