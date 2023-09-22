const { getImageClusteringData } = require("../ai/general-clustering.model");
const { getFaceDetectionData } = require("../ai/face-recognition.model");
const { addImageToDB, checkImageExists } = require("../db/index");
const { getImageData } = require("./image.helper");

async function processImage(data) {
  const detections = await getFaceDetectionData(data);
  const { x_projection, y_projection } = await getImageClusteringData(data);
  const exists = await checkImageExists(x_projection, y_projection);
  if (exists) {
    return { id: exists.id };
  }
  const imageData = await getImageData(data);
  const id = await addImageToDB({
    ...imageData,
    ...detections,
    x_projection,
    y_projection,
  });
  return { id };
}

module.exports = { processImage };
