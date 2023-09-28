const express = require("express");
const { getFaceEmbeddings } = require("../lib/ai/face-embedder.model");

const compareRouter = express.Router();

function dot(a, b) {
  return a.reduce((acc, _, index) => acc + a[index] * b[index], 0);
}

function magnitude(first) {
  return Math.sqrt(first.reduce((res, value, index) => res + value ** 2, 0));
}

function L2(a, b) {
  return Math.sqrt(
    a.reduce((res, _, index) => res + (a[index] - b[index]) ** 2, 0)
  );
}

compareRouter.post("/", async (req, res) => {
  const [firstSource, secondSource] = req.body.images;
  const { embeddings: firstEmbeddings } = await getFaceEmbeddings({
    base64: firstSource.base64,
  });
  const { embeddings: secondEmbeddings } = await getFaceEmbeddings({
    base64: secondSource.base64,
  });
  const distance = L2(firstEmbeddings, secondEmbeddings);
  const similarity =
    dot(firstEmbeddings, secondEmbeddings) /
    (magnitude(firstEmbeddings) * magnitude(secondEmbeddings));

  res.status(200).json({ data: Math.max(Math.round(similarity * 100), 0) });
});

module.exports = compareRouter;
