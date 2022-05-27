import calcRandoms from "./services/randoms.js";
// import { fork } from "child_process";

export default class RandomsController {
  constructor() {}

  getRandoms(req, res, next) {
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
  }
}
