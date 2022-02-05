import express from "express";
import handlebars from "express-handlebars";
import routerProductos from "./routes/routerProductos/routerProductos.js";

const app = express();

const PORT = 8080;

app.engine("handlebars", handlebars.engine());
app.set("views", "./views/hbs");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/productos", routerProductos);

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
