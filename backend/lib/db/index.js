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

async function getTotalImageCount() {
  const [count] = await mysql("images").count("*");
  return count;
}

async function getRecentDetections(limit, skip, tags) {
  const subquery = () =>
    mysql("images as I")
      .select("I.id as image_id")
      .join("images_tags as IT", "I.id", "=", "IT.image_id")
      .join("tags as T", "T.tag_id", "=", "IT.tag_id")
      .whereIn("tag_name", tags)
      .groupBy("I.id");

  const [{ "count(*)": total }] = await mysql("images")
    .count("*")
    .modify(function (queryBuilder) {
      if (tags.length) {
        queryBuilder.whereIn("id", subquery());
      }
    });

  const detections = await mysql("images")
    .select("*")
    .modify(function (queryBuilder) {
      if (tags.length) {
        queryBuilder.whereIn("id", subquery());
      }
    })
    .orderBy("created_at", "desc")
    .offset(skip)
    .limit(limit);
  return {
    recentDetections: detections.map((detection) => ({
      ...detection,
      detected_faces: JSON.parse(detection.detected_faces),
    })),
    total,
  };
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

async function checkTagExists(tag_name) {
  const [{ "count(*)": count }] = await mysql("tags").count("*").where({
    tag_name,
  });
  return count ? true : false;
}

async function getTagByName(tag_name) {
  const [tag] = await mysql("tags").select("*").where({ tag_name });
  return tag;
}

async function addTagToDB(tag_name) {
  const tagExists = await checkTagExists(tag_name);
  if (tagExists) {
    const { tag_id } = await getTagByName(tag_name);
    return tag_id;
  }
  const [tag] = await mysql("tags").insert({
    tag_name,
  });
  return tag;
}

async function checkTagsAreAdded(image_id) {
  const [{ "count(*)": count }] = await mysql("images_tags").count("*").where({
    image_id,
  });
  return count ? true : false;
}

async function addTagsToDB(image_id, tags) {
  const alreadyAdded = await checkTagsAreAdded(image_id);
  if (alreadyAdded) return 0;
  const tagPromises = tags
    .filter(({ probability }) => probability >= 0.9)
    .map(({ tag_name }) => addTagToDB(tag_name));
  for await (const tag_id of tagPromises) {
    await mysql("images_tags").insert({
      image_id,
      tag_id,
    });
  }
  return 1;
}

async function getTopTags(limit) {
  const topTags = await mysql("tags as T")
    .select("tag_name")
    .count("*")
    .join("images_tags as IT", "T.tag_id", "=", "IT.tag_id")
    .groupBy("tag_name")
    .orderBy("count(*)", "desc")
    .limit(limit);
  return topTags.map((tag) => {
    const { tag_name, "count(*)": count } = tag;
    return {
      tag_name,
      count,
    };
  });
}

module.exports = {
  getTopTags,
  addTagsToDB,
  addImageToDB,
  getImageFromDB,
  checkImageExists,
  getTotalImageCount,
  getRecentDetections,
  getRecommendedDetections,
};
