import passport from "passport";
import LocalStrategy from "passport-local";
// import { config } from "../../config/index.js";
// import FacebookStrategy from "passport-facebook";

let users = [{ username: "coco", password: "coco" }];

// // FacebookStrategy
// passport.use(
//   "loginfacebook",
//   new FacebookStrategy(
//     {
//       clientID: config.facebookID,
//       clientSecret: config.facebookSecret,
//       callbackURL:
//         "https://eccomerce-coder.herokuapp.com/auth/facebook/callback",
//       profileFields: ["id", "displayName", "photos", "emails"],
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       done(null, profile);
//     }
//   )
// );

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

// Serialize y desirialize para LocalStrategy
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  let user = users.find((user) => user.username == username);
  done(null, user);
});

// // Serialize y deserialize para Facebook
// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((obj, done) => {
//   done(null, obj);
// });

export { passport };
