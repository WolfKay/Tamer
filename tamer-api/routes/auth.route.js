var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/user/login", authController.Login);
router.post("/user/logout", authController.Logout);

router.post("/user/delete", authController.delete);


module.exports = router;
