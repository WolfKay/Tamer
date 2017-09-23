var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
// var MongoStore = require('connect-mongo')(session);
var passport = require("passport");
var cors = require("cors");

require("./configs/db.config");
require("./configs/passport.config").setup(passport);
var corsOptions = require("./configs/cors.config");

var authRoutes = require("./routes/auth.route");
var messagesRoutes = require("./routes/messages.route");

var app = express();

app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "SuperSecret",
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: true, maxAge: 2419200000 }
}));
app.use(passport.initialize());
app.use(passport.session());

const apiPrefix = "/api";
app.use(`${apiPrefix}`, authRoutes);
app.use(`${apiPrefix}`, messagesRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message: err.message});
});

module.exports = app;
