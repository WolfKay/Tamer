const express = require("express");
const User = require("../models/user.model");
const passport = require("passport");


module.exports.register = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    pref: req.body.pref
  });

  User.create(user)
  .then( user => res.status(201).json(user))
  .catch(err => next(err));
};




module.exports.edit = (req, res, next) => {

  User.findByIdAndUpdate( req.user._id, { $set: req.body}, { new: true})
  .then( user => res.status(201).json(user))
  .catch(err => next(err));
};



// module.exports.like = (req, res, next) => {
//   User.create(req.user)
//   .then( user => res.status(201).json(user))
//   .catch(err => next(err));
// };

// module.exports.dislike = (req, res, next) => {
//   User.create(req.user)
//   .then( user => res.status(201).json(user))
//   .catch(err => next(err));
// };