var express = require("express");
var router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.get);
router.put("/", userController.edit);
router.post("/", userController.register);
// router.post("/", userController.like);
// router.post("/", userController.dislike);

module.exports = router;