var express = require("express");
var router = express.Router();
const passportConfig = require("../configs/passport.config");

const authController = require("../controllers/auth.controller");

router.post("/user/login", authController.Login);
router.post("/user/logout", passportConfig.isAuthenticated, authController.Logout);


module.exports = router;
