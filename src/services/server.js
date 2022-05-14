import express from "express";
import handlebars from "express-handlebars";
import { createServer } from "http";
import { initSocket } from "./sockets.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import responseTime from "response-time";
import logger from "../utils/loggers/log4js.js";
import log from "../utils/loggers/logInfo.js";
import cors from "cors";
import { config, db } from "../config/index.js";
import router from "../routes/index.js";

// Inicialización de server y sockets
const app = express();
const httpServer = createServer(app);

// Motor de plantilla - handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

// Middlewares nivel app
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: db.mongo_atlas,
      mongoOptions: db.mongoAdvancedOptions,
      autoRemove: "native",
    }),
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 600000,
    },
    secret: config.sessionSecret,
    rolling: true,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(responseTime());
app.use(log);

// Router

app.use("/", router);

app.get("*", (req, res, next) => {
  logger.warn(`Path: ${req.path}, Method: ${req.method}`);
  res.json({ errorType: "404" });
});

initSocket(httpServer);

export { httpServer };
