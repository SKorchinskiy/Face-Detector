const mysql = require("./mysql.config");

async function getImageFromDB(id) {
  const [{ url, bounding_box }] = await mysql("images")
    .select("url", "bounding_box")
    .where({ id });

  return { id, imageUrl: url, bounding_box: JSON.parse(bounding_box) };
}

async function addImageToDB(url, bounding_box) {
  const [id] = await mysql("images").insert({
    url,
    bounding_box: JSON.stringify(bounding_box),
  });
  return id;
}

module.exports = {
  getImageFromDB,
  addImageToDB,
};
