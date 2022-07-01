import Koa from "koa";
import koaBody from "koa-body";
import cors from "@koa/cors";
import router from "../routes/index.js";

const app = new Koa();

// Middleware
app.use(koaBody());
app.use(cors());

// Routes
app.use(router());

export default app;
