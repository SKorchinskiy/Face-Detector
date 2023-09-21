async function getImageData(formData) {
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
      image_url: data.image.url,
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
  return await getImageData(formData);
}

async function getDataFromUrlString(urlString) {
  const formData = new FormData();
  formData.append("image", urlString);
  return await getImageData(formData);
}

async function getImageDataFromRequest(req) {
  const imageData = await (req.body.imageUrl
    ? getDataFromUrlString(req.body.imageUrl)
    : getDataFromBinaryString(req.body.image.data));
  return imageData;
}

module.exports = { getImageDataFromRequest };
