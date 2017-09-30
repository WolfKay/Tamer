const express = require("express");
const User = require("../models/user.model");
const passport = require("passport");
const mongoose = require("mongoose");
const _ = require("lodash");


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
  const userLikeId = req.params.id;  
  const currentUserId = req.user._id;

  User.findById(userLikeId)
    .then(user => {
      if (user) {
        if (user.like.indexOf(currentUserId) > -1) {
          Promise.all([
            User.findByIdAndUpdate(currentUserId, {
              $addToSet: { match: userLikeId, like: userLikeId }
            }, { new: true }).populate("match"),
            User.findByIdAndUpdate(userLikeId, {$addToSet: { match: currentUserId }}, {new: true})
          ])
          .then(users => res.status(201).json(_.find(users, "_id", currentUserId)))
          .catch(err => next(err));
        } else {
          User.findByIdAndUpdate(currentUserId, {$addToSet: { like: userLikeId }}, {new: true})
            .then(user => res.status(201).json(user))
            .catch(err => next(err));   
        }
      } else {
        res.status(404).json({ message: "User not found"});
      }
    })
    .catch(err => next(err));
};

module.exports.dislike = (req, res, next) => {
  const userDislikeId = req.params.id;  
  const currentUserId = req.user._id;

  User.findById(userDislikeId)
    .then(user => {
      if (user) {
        Promise.all([
          User.findByIdAndUpdate(currentUserId, { 
            $addToSet: { dislike: userDislikeId },
            $pull: { like: userDislikeId, match: userDislikeId }
          }, { new: true }).populate("match"),
          User.findByIdAndUpdate(userDislikeId, {$pull: { match: currentUserId }}, {new: true})
        ])
        .then(users => res.status(201).json(_.find(users, "_id", currentUserId)))
        .catch(err => next(err));
      } else {
        res.status(404).json({ message: "User not found"});
      }
    })
    .catch(err => next(err));
};

// module.exports.match = (req, res, next) => {
//   const isMatch = {
//     $and : [
//       { _id: { $nin : req.user.dislike } },
//       { _id: { $nin : req.user.like } },
//     ]
//   };
// };

module.exports.delete = (req, res, next) => {
  User.findByIdAndRemove(req.user._id)
      .then(user => res.status(201).json("Your account has been deleted"))
      .catch(err => next(err));
};
  