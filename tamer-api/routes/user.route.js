var express = require("express");
var router = express.Router();
const passportConfig = require("../configs/passport.config");

const userController = require("../controllers/user.controller");

router.post("/user", userController.register);
router.put("/user", passportConfig.isAuthenticated, userController.edit);
router.delete("/user", passportConfig.isAuthenticated, userController.delete);
router.get("/user/recs", passportConfig.isAuthenticated, userController.recs);

router.post("/user/like/:id", passportConfig.isAuthenticated, userController.like);
router.post("/user/dislike/:id", passportConfig.isAuthenticated, userController.dislike);


module.exports = router;