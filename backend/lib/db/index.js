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

module.exports = {
  getImageFromDB,
  addImageToDB,
};
