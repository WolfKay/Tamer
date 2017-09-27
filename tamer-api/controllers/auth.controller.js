const express = require("express");
const User = require("../models/user.model");
const passport = require("passport");



module.exports.Login = (req, res, next) =>  {
  const email = req.body.email;
  const password = req.body.password;
  
    
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  } else {
    passport.authenticate("local-auth", (err, user, message) => {
      if (err) { return next(err); }
      else if (!user) {
        return res.status(401).json(message);
      } else {
        req.login(user, (err) => {
          if (err) { return next(err); }
          else {
            return res.status(200).json(req.user);
          }
        });
      }
    })(req, res, next);
  }
};

module.exports.Logout = (req, res, next) => {
  req.logout();
  req.session.destroy(function (err) {
    if (err) { return next(err); }
    return res.status(204).send();
  });
};

module.exports.delete = (req, res, next) => {

  User.findByIdAndRemove( req.user._id )
.then( user => res.status(201).json("Your account has been deleted"))
.catch(err => next(err));
};
