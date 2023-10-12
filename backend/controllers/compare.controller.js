const { getFaceEmbeddings } = require("../lib/ai/face-embedder.model");
const {
  L2,
  getCosineSimilarity,
  getComparisonDetails,
} = require("../lib/utils/vector.util");
const { createComparisonRecord } = require("../services/image.service");
const { getCurrentUserComparisons } = require("../services/compare.service");

async function compareImages(req, res) {
  const [firstSource, secondSource] = req.body.images;
  const { embeddings: firstEmbeddings } = await getFaceEmbeddings({
    base64: firstSource.faceBuffer.base64,
  });
  const { embeddings: secondEmbeddings } = await getFaceEmbeddings({
    base64: secondSource.faceBuffer.base64,
  });
  L2(firstEmbeddings, secondEmbeddings);
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
}

async function getUserComparisons(req, res) {
  const id = req.params.id;
  const recentComparisons = await getCurrentUserComparisons({ id });
  return res.status(200).json({
    data: recentComparisons,
  });
}

module.exports = {
  compareImages,
  getUserComparisons,
};
