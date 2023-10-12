const mysql = require("../configs/mysql.config");

async function getCurrentUserDetections({ id }) {
  const recentDetections = await mysql("detections as D")
    .join("images as I", "D.face_id", "=", "I.id")
    .select({
      detection_id: "D.detection_id",
      face_id: "D.face_id",
      face_count: "I.face_count",
      performed_at: "D.performed_at",
    })
    .where({
      user_id: id,
    })
    .limit(10)
    .orderBy("D.performed_at", "desc");
  return recentDetections;
}

module.exports = { getCurrentUserDetections };
