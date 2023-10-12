const express = require("express");
const detectionRouter = express.Router();

const userMiddleware = require("../middlewares/user.middleware");
const detectionController = require("../controllers/detection.controller");

detectionRouter.use(userMiddleware.userInterpolation);

detectionRouter.post("/", detectionController.detectFaces);
detectionRouter.get("/:id", detectionController.getUserDetections);

module.exports = detectionRouter;
