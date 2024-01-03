const { setUpImageModel } = require(".");
const clarify = require("../../configs/clarify.config");

const FaceModelConfig = {
  stub: clarify.stub,
  USER_ID: clarify.USER_ID,
  APP_ID: clarify.APP_ID,
  MODEL_ID: clarify.MODEL_ID,
  MODEL_VERSION_ID: clarify.MODEL_VERSION_ID,
  metadata: clarify.metadata,
};

function formatDetectionData(detection_data) {
  return detection_data.outputs[0].data.regions.map((face_region) => ({
    bounding_box: face_region.region_info.bounding_box,
    probability: face_region.value,
  }));
}

async function getFaceDetectionData(data) {
  try {
    const faceRecognition = setUpImageModel(FaceModelConfig);
    const response = await faceRecognition(data);
    return {
      detected_faces: formatDetectionData(response),
    };
  } catch (error) {
    return error;
  }
}

module.exports = {
  getFaceDetectionData,
};
