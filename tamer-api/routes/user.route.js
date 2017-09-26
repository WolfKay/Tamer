var express = require("express");
var router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user.controller");

router.post("/user/register", userController.register);

router.put("/user/edit", userController.edit);
// router.get("/user/recs", userController.recs);

// router.post("/", userController.like);
// router.post("/", userController.dislike);

module.exports = router;