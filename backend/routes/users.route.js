const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

userRouter.use(userMiddleware.userInterpolation);

userRouter.get("/stats", userController.currentUserStats);
userRouter.get("/", userController.getCurrentUser);

module.exports = userRouter;
