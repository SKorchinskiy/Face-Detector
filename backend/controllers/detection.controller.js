const {
  processImage,
  createDetectionRecord,
} = require("../services/image.service");
const { getCurrentUserDetections } = require("../services/detection.service");

async function detectFaces(req, res) {
  try {
    const data = req.body;
    if (data.base64) {
      data.base64 = data.base64.data;
    }

    const { id } = await processImage(data);
    await createDetectionRecord({ face_id: id, user_id: req.user?.id });
    return res.status(201).json({ data: id });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

async function getUserDetections(req, res) {
  try {
    const id = +req.params.id;
    const detections = await getCurrentUserDetections({ id });
    return res.status(200).json({ data: detections });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "unknown error",
    });
  }
}

module.exports = {
  detectFaces,
  getUserDetections,
};
