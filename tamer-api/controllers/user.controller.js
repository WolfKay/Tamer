const express = require("express");
const User = require("../models/user.model");
const passport = require("passport");
const mongoose = require("mongoose");

module.exports.register = (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    alias: req.body.alias,
    age: req.body.age,
    gender: req.body.gender,
    pref: req.body.pref,
    categories: req.body.categories
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

module.exports.recs = (req, res, next) => {

  const query = {
    pref: req.user.gender,
    gender: req.user.pref,
    $and : [
      { _id: { $nin : req.user.dislike } },
      { _id: { $nin : req.user.like } },
    ]
  };

  User.find(query)
    .then(users => res.status(201).json(users))
    .catch(err => next(err));
};


module.exports.like = (req, res, next) => {
  const userId = req.user._id;
  const userLikeId = req.params.id;


  User.findByIdAndUpdate({_id: userId}, {$addToSet: {like: userLikeId}})
    .then( user => res.status(200).json(user))
    .catch(err => next(err));
};

module.exports.dislike = (req, res, next) => {
  const userId = req.user._id;
  const userDislikeId = req.params.id;


  User.findByIdAndUpdate({_id: userId}, {$addToSet: {dislike: userDislikeId}})
    .then( user => res.status(200).json(user))
    .catch(err => next(err));
};
