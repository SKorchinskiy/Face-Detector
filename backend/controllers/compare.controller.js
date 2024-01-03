const { getFaceEmbeddings } = require("../lib/ai/face-embedder.model");
const {
  getCosineSimilarity,
  getComparisonDetails,
} = require("../lib/utils/vector.util");
const { createComparisonRecord } = require("../services/image.service");
const { getCurrentUserComparisons } = require("../services/compare.service");

async function compareImages(req, res) {
  try {
    const [firstSource, secondSource] = req.body.images;
    const { embeddings: firstEmbeddings } = await getFaceEmbeddings({
      base64: firstSource.faceBuffer.base64,
    });
    const { embeddings: secondEmbeddings } = await getFaceEmbeddings({
      base64: secondSource.faceBuffer.base64,
    });

    const details = getComparisonDetails(firstEmbeddings, secondEmbeddings);
    const similarity = getCosineSimilarity(firstEmbeddings, secondEmbeddings);
    const data = {
      similarity: Math.max(Math.round(similarity * 100), 0),
      dissimilarity: 100 - Math.max(Math.round(similarity * 100), 0),
      details: { parameters: firstEmbeddings.length, ...details },
    };

    await createComparisonRecord({
      user_id: req.user.id,
      similarity: Math.max(Math.round(similarity * 100), 0),
      first_face_id: firstSource.id,
      second_face_id: secondSource.id,
    });
    return res.status(200).json({ data });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

async function getUserComparisons(req, res) {
  try {
    const id = req.params.id;
    const recentComparisons = await getCurrentUserComparisons({ id });
    return res.status(200).json({
      data: recentComparisons,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

module.exports = {
  compareImages,
  getUserComparisons,
};
