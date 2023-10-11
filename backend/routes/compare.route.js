const express = require("express");
const compareRouter = express.Router();

const userMiddleware = require("../middlewares/user.middleware");
const compareController = require("../controllers/compare.controller");

compareRouter.use(userMiddleware.userInterpolation);

compareRouter.post("/", compareController.compareImages);

module.exports = compareRouter;
