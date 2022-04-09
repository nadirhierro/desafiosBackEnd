import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import fetch from "node-fetch";
import cors from "cors";
import { config, db } from "./config/index.js";
import routerProductos from "./routes/routerProductos/routerProductos.js";
import routerMessages from "./routes/routerMessages/routerMessages.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Opciones para MongoAtlas
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const PORT = config.port;

app.engine("handlebars", handlebars.engine());
app.set("views", "views");
app.set("view engine", "handlebars");

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: db.mongo_atlas,
      mongoOptions: advancedOptions,
      autoRemove: "native",
    }),
    secret: "floyd",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/productos", routerProductos);
app.use("/mensajes", routerMessages);

app.get("/", (req, res, next) => {
  //Agrego 10 minutos en cada refresh
  let tenMinutes = 10 * 60 * 1000;
  req.session.cookie.expires = new Date(Date.now() + tenMinutes);
  req.session.cookie.maxAge = tenMinutes;
  res.render("index", { logged: req.session.name, name: req.session.name });
});

app.get("/login", (req, res, next) => {
  let name = req.query.name;
  req.session.name = name;
  console.log(req.session);
  res.redirect("/");
});

app.get("/logout", (req, res, next) => {
  let name = req.session.name;

  req.session.destroy((err) => {
    if (!err) {
      res.render("logout", { name: name });
    } else {
      res.send({ status: "logout ERROR", body: err });
    }
  });
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

httpServer.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
