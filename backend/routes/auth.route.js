const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/auth.controller");

authRouter.post("/sign-in", authController.signInController);
authRouter.post("/sign-up", authController.signUpController);

module.exports = authRouter;
