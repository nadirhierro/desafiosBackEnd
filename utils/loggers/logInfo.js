import logger from "./log4js.js";

const log = function (req, res, next) {
  logger.info(`Path: ${req.path}, Method: ${req.method}`);
  next();
};

export default log;
