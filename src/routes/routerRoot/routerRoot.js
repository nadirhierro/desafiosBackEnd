import express from "express";
import AuthController from "../../components/auth/index.js";

let controller = new AuthController();

const { Router } = express;

let routerRoot = new Router();

// Función isAuth
let isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

// Index
routerRoot.get("/", controller.welcome);

// Login

routerRoot.get("/login", controller.getLogin);

// Local Login
routerRoot.post("/login", controller.makeLogin);

// Local Signup
routerRoot.get("/signup", controller.getSignUp);

routerRoot.post("/signup", controller.makeSignUp);

// Facebook Login
routerRoot.get("/auth/facebook", controller.facebookLogIn);

routerRoot.get("/auth/facebook/callback", controller.facebookCallBack);

// Logout
routerRoot.get("/logout", controller.makeLogOut);

// Fail Login y Signup
routerRoot.get("/faillogin", controller.fakeLogIn);
routerRoot.get("/failsignup", controller.fakeSignUp);

// Acceso a home con isAuth
routerRoot.get("/home", isAuth, controller.getHome);

export default routerRoot;
