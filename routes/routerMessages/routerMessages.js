import Messages from "./messages.js";
import express from "express";

const { Router } = express;

const messages = new Messages(`./messages.txt`);

let routerMessages = new Router();

routerMessages.get("/", async (req, res, next) => {
  try {
    let data = await messages.getAll();
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
