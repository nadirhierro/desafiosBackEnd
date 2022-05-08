import log4js from "log4js";

log4js.configure({
  appenders: {
    console: { type: "console" },
    infoFile: { type: "file", filename: "info.log" },
    warningFile: { type: "file", filename: "warning.log" },
    errorFile: { type: "file", filename: "error.log" },
    // niveles
    loggerInfo: {
      type: "logLevelFilter",
      appender: "infoFile",
      level: "info",
    },
    loggerWarning: {
      type: "logLevelFilter",
      appender: "warningFile",
      level: "warn",
    },
    loggerError: {
      type: "logLevelFilter",
      appender: "errorFile",
      level: "error",
    },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: "all",
    },
    custom: {
      appenders: ["console", "loggerError", "loggerWarning", "loggerInfo"],
      level: "all",
    },
  },
});

const logger = log4js.getLogger("custom");

export default logger;
