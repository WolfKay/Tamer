var express = require("express");
var router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user.controller");

router.post("/user", userController.register);
router.put("/user", userController.edit);
router.get("/user/recs", userController.recs);

router.post("/user/like/:id", userController.like);
router.post("/user/dislike/:id", userController.like);


module.exports = router;