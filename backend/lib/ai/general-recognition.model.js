const { setUpImageModel } = require(".");
const clarify = require("./clarify.config");

const generalModelConfig = {
  stub: clarify.stub,
  USER_ID: clarify.USER_ID,
  APP_ID: clarify.APP_ID,
  MODEL_ID: clarify.GENERAL_MODEL_ID,
  MODEL_VERSION_ID: clarify.GENERAL_MODEL_VERSION_ID,
  metadata: clarify.metadata,
};

async function getGeneralImageData(image_url) {
  try {
    const generalRecognition = setUpImageModel(generalModelConfig);
    const data = await generalRecognition(image_url);
    const tags = data.outputs[0].data.concepts.map((concept) => ({
      tag_name: concept.name,
      probability: concept.value,
    }));
    return tags;
  } catch (error) {
    console.log({ error });
    return error;
  }
}

module.exports = {
  getGeneralImageData,
};
