import Messages from "./messages.js";
import express from "express";

const { Router } = express;

const messages = new Messages();

let routerMessages = new Router();

routerMessages.get("/", async (req, res, next) => {
  try {
    let data = await messages.getAllNormalized();
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});

routerMessages.post("/", async (req, res, next) => {
  try {
    let data = req.body;
    let saved = await messages.save(data);
    if (saved) {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

export default routerMessages;
