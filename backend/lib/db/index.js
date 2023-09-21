const mysql = require("./mysql.config");

async function getImageFromDB(id) {
  const [data] = await mysql("images").select("*").where({ id });
  return {
    ...data,
    detected_faces: JSON.parse(data.detected_faces),
  };
}

async function addImageToDB(imageMetaData) {
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

module.exports = {
  getImageFromDB,
  addImageToDB,
  getRecentDetections,
};
