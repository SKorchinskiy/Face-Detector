const express = require("express");

const { getImageBoundingBoxes } = require("../lib/ai");
const { createImageUrl } = require("../lib/image.helper");
const { getImageFromDB, addImageToDB } = require("../lib/db");

const detectionRouter = express.Router();

detectionRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const { imageUrl, bounding_box } = await getImageFromDB(id);
  return res.json({ id, imageUrl, bounding_box });
});

detectionRouter.post("/", async (req, res) => {
  const base64Image = Buffer.from(req.body.image.data, "binary").toString(
    "base64"
  );
  const imageUrl = await createImageUrl(base64Image);
  const bounding_box = await getImageBoundingBoxes(imageUrl);

  const id = await addImageToDB(imageUrl, bounding_box);

  return res.status(201).json({ id, imageUrl });
});

module.exports = detectionRouter;
