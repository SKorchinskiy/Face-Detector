const { setUpImageModel } = require(".");
const clarify = require("../../configs/clarify.config");

const clusteringModelCongif = {
  stub: clarify.stub,
  metadata: clarify.metadata,
  USER_ID: clarify.USER_ID,
  APP_ID: clarify.APP_ID,
  MODEL_ID: clarify.CLUSTER_MODEL_ID,
  MODEL_VERSION_ID: clarify.CLUSTER_MODEL_VERSION_ID,
};

function formatClasteringData(response) {
  return response.outputs[0].data.clusters[0].projection;
}

async function getImageClusteringData(data) {
  try {
    const generalClustering = setUpImageModel(clusteringModelCongif);
    const response = await generalClustering(data);
    const [x_projection, y_projection] = formatClasteringData(response);
    return { x_projection, y_projection };
  } catch (error) {
    return error;
  }
}

module.exports = {
  getImageClusteringData,
};
