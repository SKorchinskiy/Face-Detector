const {
  addTagsToDB,
  getImageFromDB,
  getRecentDetections: getDetections,
  getRecommendedDetections,
  getTopTags,
} = require("../lib/db");
const { getGeneralImageData } = require("../lib/ai/general-recognition.model");
const { getPagination } = require("../lib/utils/query.util");

async function getRelatedImages(req, res) {
  const id = +req.params.id;
  const limit = +req.body.limit;
  const imgData = await getImageFromDB(id);
  const related = await getRecommendedDetections(limit, imgData);
  return res.status(200).json({ data: related });
}

async function getSemanticTags(req, res) {
  const id = +req.params.id;
  const { url } = await getImageFromDB(id);
  const tags = await getGeneralImageData({ url });
  await addTagsToDB(id, tags);
  return res
    .status(200)
    .json({ data: tags.filter(({ probability }) => probability >= 0.9) });
}

async function getRecentDetections(req, res) {
  const tags = req.query.tags?.split(",") || [];
  const { limit, skip, getMetaData } = getPagination(req.query);
  const { recentDetections, total } = await getDetections(limit, skip, tags);

  const { pagination } = getMetaData(total);

  const data = { recentDetections, pagination };
  return res.status(200).json({ data });
}

async function getImagesTags(req, res) {
  const limit = +req.params.limit;
  const topTags = await getTopTags(limit);
  return res.status(200).json({ data: topTags });
}

async function getImageById(req, res) {
  const { id } = req.params;
  const data = await getImageFromDB(id);
  return res.status(200).json({ data });
}

module.exports = {
  getRelatedImages,
  getSemanticTags,
  getRecentDetections,
  getImagesTags,
  getImageById,
};
