const passportLocal = require('passport-local');
const LocalStrategy = passportLocal.Strategy;
const mongoose = require("mongoose")
const User = require('../models/user.model');

module.exports.setup = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user._id)
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user)
        })
    });

    passport.use('local-auth', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    }, function (username, password, next) {
        User.findOne({ username: username }, (err, user) => {
            if (err) { return next(err);
            } else if (!user) {
                return next(err, false, { message: 'Invalid username or password' });
            } else {
                user.checkPassword(password, (err, isMatch) => {
                    if (err) { return next(err); }
                    else if (isMatch) {
                        return next(null, user);
                    } else {
                        return next(err, false, { message: 'Invalid username or password' })
                    }
                });
            }
        })
    }))
}

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.status(403).json({ message: 'Forbidden'});
    }
}