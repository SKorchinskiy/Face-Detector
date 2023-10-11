const express = require("express");
const imageRouter = express.Router();

const imageController = require("../controllers/image.controller");

imageRouter.post("/:id/related", imageController.getRelatedImages);
imageRouter.post("/:id/tags", imageController.getSemanticTags);
imageRouter.get("/recent", imageController.getRecentDetections);
imageRouter.get("/tags/:limit", imageController.getImagesTags);
imageRouter.get("/:id", imageController.getImageById);

module.exports = imageRouter;
