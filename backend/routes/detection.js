const express = require("express");

const { getFaceDetectionData } = require("../lib/ai");
const { getImageDataFromRequest } = require("../lib/image.helper");
const { getImageFromDB, addImageToDB } = require("../lib/db");

const detectionRouter = express.Router();

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
