import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import cluster from "cluster";
import os from "os";
import responseTime from "response-time";
import logger from "./utils/loggers/log4js.js";
import log from "./utils/loggers/logInfo.js";
import fetch from "node-fetch";
import cors from "cors";
import { config, db } from "./config/index.js";
import routerRoot from "./routes/routerRoot/routerRoot.js";
import routerProductos from "./routes/routerProductos/routerProductos.js";
import routerMessages from "./routes/routerMessages/routerMessages.js";
import routerInfo from "./routes/routerInfo/routerInfo.js";
import routerRandoms from "./routes/routerRandoms/routerRandoms.js";

// Inicialización de server y sockets
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const numCPUs = os.cpus().length;

// Opciones para MongoAtlas
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// Motor de plantilla - handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", "views");
app.set("view engine", "handlebars");

// Middlewares nivel app
app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: db.mongo_atlas,
      mongoOptions: advancedOptions,
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

// Rutas
app.use("/", routerRoot);
app.use("/productos", routerProductos);
app.use("/mensajes", routerMessages);
app.use("/info", routerInfo);
app.use("/api/randoms", routerRandoms);

app.get("*", (req, res, next) => {
  logger.warn(`Path: ${req.path}, Method: ${req.method}`);
  res.json({ errorType: "404" });
});

// inicialización del server socket
io.on("connection", (socket) => {
  // cada vez que alguien se conecta, el servidor emite señal en el canal productos
  // y en el canal chat
  // para que al cliente directamente le aparezcan los productos
  // al conectarse por primera vez
  socket.emit("products", "actualizar");
  socket.emit("chat", "actualizar");
  // Aquí escucho el canal products, cuando un cliente emite, recibe el producto
  // el servidor se encarga de hacer el post a través del fetch utilizando el router
  socket.on("products", (data) => {
    fetch("http://localhost:8080/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // Una vez se realiza el post, se emite el mensaje de respuesta
        // así se les actualiza la vista a los clientes
        io.sockets.emit("products", res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  //Misma lógica para los mensajes
  socket.on("chat", (data) => {
    fetch("http://localhost:8080/mensajes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        // Una vez se realiza el post, se emite el mensaje de respuesta
        // así se les actualiza la vista a los clientes
        io.sockets.emit("chat", res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

// Si el parametro mode es FORK, se inicia el server en modo fork
// Si es CLUSTER, se inicia en modo cluster
if (config.mode == "FORK") {
  httpServer.listen(config.port, config.host, () => {});
  console.log(`Servidor funcionando en http://${config.host}:${config.port}`);
} else if (config.mode == "CLUSTER") {
  if (cluster.isPrimary) {
    console.log(`Proceso principal ${process.pid} ejecutándose`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      console.log(`Worker ${worker.process.pid} muerto`);
      cluster.fork();
    });
  } else {
    httpServer.listen(config.port, config.host, () => {});
    console.log(
      `Servidor funcionando en http://${config.host}:${config.port} || Worker ${process.pid}`
    );
  }
}
