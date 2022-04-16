import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import FacebookStrategy from "passport-facebook";
import { config } from "../../config/index.js";

const { Router } = express;

let routerRoot = new Router();

// Array usuarios

let users = [{ username: "coco", password: "coco" }];

// Función isAuth
let isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};

// FacebookStrategy
passport.use(
  "loginfacebook",
  new FacebookStrategy(
    {
      clientID: config.facebookID,
      clientSecret: config.facebookSecret,
      callbackURL: "http://localhost:8080/auth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "emails"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

// LocalStrategy

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    let user = users.find((user) => user.username == username);
    if (!user) return done(null, false);
    if (user.password != password) return done(null, false);
    return done(null, user);
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      let direccion = req.body;
      let user = users.find((user) => user.username == username);
      if (user) return done(null, false);
      let newUser = { username, password, direccion };
      users.push(newUser);
      return done(null, newUser);
    }
  )
);

// // Serialize y desirialize para LocalStrategy
// passport.serializeUser((user, done) => {
//   done(null, user.username);
// });

// passport.deserializeUser((username, done) => {
//   let user = users.find((user) => user.username == username);
//   done(null, user);
// });

// Serialize y deserialize para Facebook
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Index
routerRoot.get("/", (req, res, next) => {
  res.render("index");
});

// Login

routerRoot.get("/login", (req, res, next) => {
  res.render("login");
});

// Local Login
routerRoot.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "home",
    failureRedirect: "faillogin",
  })
);

// Local Signup
routerRoot.get("/signup", (req, res, next) => {
  res.render("signup");
});

routerRoot.post(
  "/signup",
  passport.authenticate("signup", {
    successRedirect: "home",
    failureRedirect: "failsignup",
  })
);

// Facebook Login
routerRoot.get(
  "/auth/facebook",
  passport.authenticate("loginfacebook", {
    scope: ["emails"],
  })
);

routerRoot.get(
  "/auth/facebook/callback",
  passport.authenticate("loginfacebook", {
    successRedirect: "/home",
    failureRedirect: "/faillogin",
  })
);

// Logout
routerRoot.get("/logout", (req, res, next) => {
  let name = req.session.name;

  req.session.destroy((err) => {
    if (!err) {
      res.render("logout", { name: name });
    } else {
      res.send({ status: "logout ERROR", body: err });
    }
  });
});

// Fail Login y Signup
routerRoot.get("/faillogin", (req, res, next) => {
  res.render("faillogin");
});
routerRoot.get("/failsignup", (req, res, next) => {
  res.render("failsignup");
});

// Acceso a home con isAuth
routerRoot.get("/home", isAuth, (req, res, next) => {
  res.render("home", {
    username: req.user.displayName,
    photoUrl: req.user.photos[0].value,
    email: req.user.email,
  });
});

export default routerRoot;
