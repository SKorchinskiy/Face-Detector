const mysql = require("../configs/mysql.config");

async function checkUserExistsByEmail({ email }) {
  const [{ "count(*)": exists }] = await mysql("users")
    .count("*")
    .where({ email });
  return exists;
}

async function getUserById({ id }) {
  const [user] = await mysql("users").where({
    id,
  });
  return user;
}

async function getUserStats({ id }) {
  const detections = await getUserDetections({
    user_id: id,
    modify: (_) => {},
  });
  const comparisons = await getUserComparisons({
    user_id: id,
    modify: (_) => {},
  });
  const last30Days = function (queryBuilder, table) {
    const time = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    queryBuilder.where(`${table}.performed_at`, ">=", time);
  };
  const last7Days = function (queryBuilder, table) {
    const time = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    queryBuilder.where(`${table}.performed_at`, ">=", time);
  };
  const recentDetections = await getUserDetections({
    user_id: id,
    modify: last30Days,
  });
  const recentComparisons = await getUserComparisons({
    user_id: id,
    modify: last30Days,
  });
  const latestDetections = await getUserDetections({
    user_id: id,
    modify: last7Days,
  });
  const latestComparisons = await getUserComparisons({
    user_id: id,
    modify: last7Days,
  });
  return {
    detections,
    comparisons,
    recent: {
      detections: recentDetections,
      comparisons: recentComparisons,
    },
    latest: {
      detections: latestDetections,
      comparisons: latestComparisons,
    },
  };
}

async function getUserDetections({ user_id, modify }) {
  const detections = await mysql("detections")
    .where({ user_id })
    .modify(modify, "detections");
  return detections;
}

async function getUserComparisons({ user_id, modify }) {
  const comparisons = await mysql("comparisons")
    .where({ user_id })
    .modify(modify, "comparisons");
  return comparisons;
}

module.exports = {
  getUserById,
  getUserStats,
  checkUserExistsByEmail,
};
