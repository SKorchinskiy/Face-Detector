const express = require("express");

const { processImage } = require("../lib/image/image.service");

const detectionRouter = express.Router();

detectionRouter.post("/", async (req, res) => {
  const data = req.body;
  if (data.base64) {
    data.base64 = data.base64.data;
  }

  const { id } = await processImage(data);

  return res.status(201).json({ data: id });
});

module.exports = detectionRouter;
