const { setUpImageModel } = require(".");
const clarify = require("../../configs/clarify.config");

const EmbedderModelConfig = {
  stub: clarify.stub,
  USER_ID: clarify.USER_ID,
  APP_ID: clarify.APP_ID,
  MODEL_ID: clarify.EMBEDDER_MODEL_ID,
  MODEL_VERSION_ID: clarify.EMBEDDER_MODEL_VERSION_ID,
  metadata: clarify.metadata,
};

function retrieveEmbeddingsData(response) {
  const embeddings = response.outputs[0].data.embeddings[0].vector;
  return embeddings;
}

async function getFaceEmbeddings(data) {
  try {
    const faceEmbedder = setUpImageModel(EmbedderModelConfig);
    const response = await faceEmbedder(data);
    return {
      embeddings: retrieveEmbeddingsData(response),
    };
  } catch (error) {
    return error;
  }
}

module.exports = {
  getFaceEmbeddings,
};
