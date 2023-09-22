const mysql = require("./mysql.config");

async function getImageFromDB(id) {
  const [data] = await mysql("images").select("*").where({ id });
  return {
    ...data,
    detected_faces: JSON.parse(data.detected_faces),
  };
}

async function checkImageExists(x_projection, y_projection) {
  const [data] = await mysql("images")
    .select("id")
    .where({ x_projection, y_projection });
  return data;
}

async function addImageToDB(imageMetaData) {
  const { x_projection, y_projection } = imageMetaData;
  const response = await checkImageExists(x_projection, y_projection);
  if (response?.id) return response.id;

  const [id] = await mysql("images").insert({
    ...imageMetaData,
    detected_faces: JSON.stringify(imageMetaData.detected_faces),
    face_count: imageMetaData.detected_faces.length,
  });
  return id;
}

async function getRecentDetections(count) {
  const detections = await mysql("images")
    .select("*")
    .orderBy("created_at", "desc")
    .limit(count);
  return detections.map((detection) => ({
    ...detection,
    detected_faces: JSON.parse(detection.detected_faces),
  }));
}

async function getRecommendedDetections(limit, imgData) {
  const closestImageQuery = `SQRT(POWER(${imgData.x_projection}-x_projection, 2) + POWER(${imgData.y_projection}-y_projection, 2))`;
  const detections = await mysql("images")
    .select("*")
    .orderByRaw(closestImageQuery)
    .whereRaw(`id <> ${imgData.id}`)
    .limit(limit);
  return detections.map((detection) => ({
    ...detection,
    detected_faces: JSON.parse(detection.detected_faces),
  }));
}

module.exports = {
  getImageFromDB,
  addImageToDB,
  checkImageExists,
  getRecentDetections,
  getRecommendedDetections,
};
