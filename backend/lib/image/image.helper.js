async function createIMGBBImage(formData) {
  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );
    let buffer = [];
    for await (const chunk of response.body) {
      buffer = buffer.concat(...chunk);
    }
    const { data } = JSON.parse(String.fromCharCode(...buffer));
    return {
      url: data.image.url,
      bytes: data.size,
      width: data.width,
      height: data.height,
      expiration: data.expiration,
    };
  } catch (error) {
    console.log("hosting error", error);
  }
}

async function getDataFromBinaryString(binaryString) {
  const base64Image = Buffer.from(binaryString, "binary").toString("base64");
  const formData = new FormData();
  formData.append("image", base64Image);
  return await createIMGBBImage(formData);
}

async function getDataFromUrlString(urlString) {
  const formData = new FormData();
  formData.append("image", urlString);
  return await createIMGBBImage(formData);
}

async function getImageData(data) {
  if (data.url) {
    return await getDataFromUrlString(data.url);
  }
  return await getDataFromBinaryString(data.base64);
}

module.exports = {
  getImageData,
};
