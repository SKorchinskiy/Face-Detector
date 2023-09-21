const express = require("express");

const { getFaceDetectionData } = require("../lib/ai/face-recognition.model");
const { getGeneralImageData } = require("../lib/ai/general-recognition.model");
const { getImageDataFromRequest } = require("../lib/image.helper");
const {
  getImageFromDB,
  addImageToDB,
  getRecentDetections,
} = require("../lib/db");

const detectionRouter = express.Router();

detectionRouter.post("/image/tags", async (req, res) => {
  const { image_url } = req.body;
  const tags = await getGeneralImageData(image_url);
  return res.status(200).json({ data: tags });
});

detectionRouter.get("/recent/:count", async (req, res) => {
  const count = +req.params.count;
  const recentDetections = await getRecentDetections(count);
  return res.status(200).json({ data: recentDetections });
});

detectionRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getImageFromDB(id);
  return res.status(200).json(data);
});

detectionRouter.post("/", async (req, res) => {
  const imageData = await getImageDataFromRequest(req);
  const faceDetection = await getFaceDetectionData(imageData.image_url);
  const id = await addImageToDB({ ...imageData, ...faceDetection });

  return res.status(201).json({ id });
});

module.exports = detectionRouter;
