import { passport } from "./services/passport.js";

export default class AuthController {
  constructor() {}

  // Redirección a index
  welcome(req, res, next) {
    res.render("index");
  }

  // Redirección a login
  getLogin(req, res, next) {
    res.render("login");
  }

  // Facebook login
  facebookLogIn(req, res, next) {
    passport.authenticate("loginfacebook", {
      scope: ["emails"],
    })(req, res, next);
  }

  // Facebook Callback
  facebookCallBack(req, res, next) {
    passport.authenticate("loginfacebook", {
      successRedirect: "/home",
      failureRedirect: "/faillogin",
    })(req, res, next);
  }

  // Hacer login
  makeLogin(req, res, next) {
    passport.authenticate("login", {
      successRedirect: "home",
      failureRedirect: "faillogin",
    })(req, res, next);
  }

  // Redirección a signup
  getSignUp(req, res, next) {
    res.render("signup");
  }

  // Hacer signup
  makeSignUp(req, res, next) {
    passport.authenticate("signup", {
      successRedirect: "home",
      failureRedirect: "failsignup",
    })(req, res, next);
  }

  // Hacer logout
  makeLogOut(req, res, next) {
    let name = req.session.name;

    req.session.destroy((err) => {
      if (!err) {
        res.render("logout", { name: name });
      } else {
        res.send({ status: "logout ERROR", body: err });
      }
    });
  }
  // Redirección a fail login
  fakeLogIn(req, res, next) {
    res.render("faillogin");
  }

  // Redirección a fail signup
  fakeSignUp(req, res, next) {
    res.render("failsignup");
  }

  // Redirección a home
  getHome(req, res, next) {
    res.render("home", {
      username: req.user.displayName,
      photoUrl: req.user.photos,
      email: req.user.email,
    });
  }
}
