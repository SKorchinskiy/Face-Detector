const mysql = require("../configs/mysql.config");

async function getCurrentUserComparisons({ id }) {
  const recentComparisons = await mysql("comparisons as C")
    .select({
      comparison_id: "C.comparison_id",
      first_face_id: "C.first_face_id",
      second_face_id: "C.second_face_id",
      similarity: "C.similarity",
      performed_at: "C.performed_at",
    })
    .where({
      user_id: id,
    })
    .orderBy("performed_at", "desc")
    .limit(10);
  return recentComparisons;
}

module.exports = {
  getCurrentUserComparisons,
};
