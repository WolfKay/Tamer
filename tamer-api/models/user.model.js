const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10; 

const GENDERS = ["M", "F"];
const PREFERENCE = ["M", "F", "BI"];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: "The username is required"
  },
  password: {
    type: String,
    required: "The password is required"
  },
  age: {
    type: Number,
    required: "Age is required"
  },

  gender: {
    type: String,
    enum: GENDERS,
    required: "Gender is required"
  },

  pref: {
    type: String,
    enum: PREFERENCE,
    required: "State your preference"
  },

  like: [{}],

  dislike: [{}]

}, {timestamps: true});

userSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) { return next(err); }
    else {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { return next(err); }
        else {
          user.password = hash;
          return next();
        }
      });
    }
  });
});

userSchema.methods.checkPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;