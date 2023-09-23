const express = require("express");
const {
  getImageFromDB,
  getRecentDetections,
  getRecommendedDetections,
  getTotalImageCount,
} = require("../lib/db");
const { getGeneralImageData } = require("../lib/ai/general-recognition.model");
const { getPagination } = require("../lib/utils/query.util");

const imageRouter = express.Router();

imageRouter.post("/:id/related", async (req, res) => {
  const id = +req.params.id;
  const limit = +req.body.limit;
  const imgData = await getImageFromDB(id);
  const related = await getRecommendedDetections(limit, imgData);
  return res.status(200).json({ data: related });
});

imageRouter.post("/:id/tags", async (req, res) => {
  const id = +req.params.id;
  const { url } = await getImageFromDB(id);
  const tags = await getGeneralImageData({ url });
  return res.status(200).json({ data: tags });
});

imageRouter.get("/recent", async (req, res) => {
  const { limit, skip, getMetaData } = getPagination(req.query);
  const recentDetections = await getRecentDetections(limit, skip);
  const { "count(*)": total } = await getTotalImageCount();

  const pageMeta = getMetaData(total);

  const data = { recentDetections, ...pageMeta };
  return res.status(200).json({ data });
});

imageRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getImageFromDB(id);
  return res.status(200).json({ data });
});

module.exports = imageRouter;
