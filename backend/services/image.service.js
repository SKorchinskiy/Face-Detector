const {
  getImageClusteringData,
} = require("../lib/ai/general-clustering.model");
const { getFaceDetectionData } = require("../lib/ai/face-recognition.model");
const { addImageToDB, checkImageExists } = require("../lib/db/index");
const { getImageData } = require("../lib/image/image.helper");
const mysql = require("../configs/mysql.config");

async function createDetectionRecord({ user_id, face_id }) {
  await mysql("detections").insert({ face_id, user_id });
}

async function createComparisonRecord({
  user_id,
  first_face_id,
  second_face_id,
}) {
  await mysql("comparisons").insert({
    user_id,
    first_face_id,
    second_face_id,
  });
}

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

module.exports = {
  processImage,
  createDetectionRecord,
  createComparisonRecord,
};
