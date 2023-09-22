const express = require("express");

const { processImage } = require("../lib/image/image.service");
const { getGeneralImageData } = require("../lib/ai/general-recognition.model");
const {
  getImageFromDB,
  getRecentDetections,
  getRecommendedDetections,
} = require("../lib/db");

const detectionRouter = express.Router();

detectionRouter.post("/image/tags", async (req, res) => {
  const data = req.body;
  const tags = await getGeneralImageData(data);
  return res.status(200).json({ data: tags });
});

detectionRouter.get("/recent/:count", async (req, res) => {
  const count = +req.params.count;
  const recentDetections = await getRecentDetections(count);
  return res.status(200).json({ data: recentDetections });
});

detectionRouter.post("/related/:id", async (req, res) => {
  const id = +req.params.id;
  const limit = +req.body.limit;
  const imgData = await getImageFromDB(id);
  const related = await getRecommendedDetections(limit, imgData);
  return res.status(200).json({ data: related });
});

detectionRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getImageFromDB(id);
  return res.status(200).json(data);
});

detectionRouter.post("/", async (req, res) => {
  const data = req.body;
  if (data.base64) {
    data.base64 = data.base64.data;
  }

  const { id } = await processImage(data);

  return res.status(201).json({ id });
});

module.exports = detectionRouter;
