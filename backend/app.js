require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var usersRouter = require("./routes/users.route");
var detectionRouter = require("./routes/detection.route");
const imageRouter = require("./routes/image.route");
const compareRouter = require("./routes/compare.route");
const authRouter = require("./routes/auth.route");

var app = express();
app.set("port", process.env.PORT || 8000);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.JWT_SIGNATURE));
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/images", imageRouter);
app.use("/compare", compareRouter);
app.use("/detect", detectionRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
