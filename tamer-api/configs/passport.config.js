const passportLocal = require("passport-local");
const LocalStrategy = passportLocal.Strategy;
const mongoose = require("mongoose");
const User = require("../models/user.model");

module.exports.setup = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use("local-auth", new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  }, function (email, password, next) {
    User.findOne({ email: email})
      .populate("match")
      .then(user => {
        if (!user) {
          next(null, false, { message: "Invalid email or password" });
        } else {
          user.checkPassword(password, (err, isMatch) => {
            if (err) { return next(err); }
            else if (isMatch) {
              return next(null, user);
            } else {
              return next(err, false, { message: "Invalid email or password" });
            }
          });
        }
      })
      .catch(err => next(err, false, { message: "Invalid email or password" }));
  }));
};

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.status(403).json({ message: "Forbidden"});
  }
};