import getData from "./services/getData.js";

export default class Info {
  constructor() {}

  getInfo(req, res, next) {
    let data = getData();
    res.render("info", { datos: data });
  }
}
