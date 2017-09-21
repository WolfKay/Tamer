var express = require("express");
var router = express.Router();
const passportConfig = require("../configs/passport.config");

const messagesController = require("../controllers/messages.controller");

router.get("/message", passportConfig.isAuthenticated, messagesController.getMessage);


module.exports = router;
