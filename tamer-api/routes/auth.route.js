var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/login", authController.Login);
router.post("/register", authController.Register);
router.post("/logout", authController.Logout);

module.exports = router;
