const express = require("express");
const User = require("../models/user.model");

module.exports.get = (req, res, next) => {

};

module.exports.edit = (req, res, next) => {
  
};

module.exports.register = (req, res, next) => {
  User.create(req.user)
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