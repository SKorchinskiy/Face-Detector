async function createImageUrl(base64Image) {
  try {
    const formData = new FormData();
    formData.append("image", base64Image);
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
    return data.image.url;
  } catch (error) {
    console.log("hosting error", error);
  }
}

module.exports = {
  createImageUrl,
};
