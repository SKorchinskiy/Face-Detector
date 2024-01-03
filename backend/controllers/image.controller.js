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
  try {
    const id = +req.params.id;
    const limit = +req.body.limit;
    const imgData = await getImageFromDB(id);
    const related = await getRecommendedDetections(limit, imgData);
    return res.status(200).json({ data: related });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

async function getSemanticTags(req, res) {
  try {
    const id = +req.params.id;
    const { url } = await getImageFromDB(id);
    const tags = await getGeneralImageData({ url });
    await addTagsToDB(id, tags);
    const stronglyRelatedTags = tags.filter(
      ({ probability }) => probability >= 0.9
    );
    return res.status(200).json({ data: stronglyRelatedTags });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

async function getRecentDetections(req, res) {
  try {
    const tags = req.query.tags?.split(",") || [];
    const { limit, skip, getMetaData } = getPagination(req.query);
    const { recentDetections, total } = await getDetections(limit, skip, tags);

    const { pagination } = getMetaData(total);

    const data = { recentDetections, pagination };
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

async function getImagesTags(req, res) {
  try {
    const limit = +req.params.limit;
    const topTags = await getTopTags(limit);
    return res.status(200).json({ data: topTags });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

async function getImageById(req, res) {
  try {
    const { id } = req.params;
    const data = await getImageFromDB(id);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

module.exports = {
  getRelatedImages,
  getSemanticTags,
  getRecentDetections,
  getImagesTags,
  getImageById,
};
