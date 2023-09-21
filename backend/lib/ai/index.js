const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const clarify = require("./clarify.config");

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + clarify.PAT);

function formatDetectionData(detection_data) {
  return detection_data.outputs[0].data.regions.map((face_region) => ({
    bounding_box: face_region.region_info.bounding_box,
    probability: face_region.value,
  }));
}

async function getFaceDetectionData(image) {
  try {
    const response = await new Promise((resolve, reject) =>
      stub.PostModelOutputs(
        {
          user_app_id: {
            user_id: clarify.USER_ID,
            app_id: clarify.APP_ID,
          },
          model_id: clarify.MODEL_ID,
          version_id: clarify.MODEL_VERSION_ID,
          inputs: [
            { data: { image: { url: image, allow_duplicate_url: true } } },
          ],
        },
        metadata,
        (err, response) => {
          if (err) {
            reject(err);
          }

          if (response.status.code !== 10000) {
            reject(
              "Post model outputs failed, status: " +
                response.status.description
            );
          }

          resolve(response);
        }
      )
    );
    return {
      detected_faces: formatDetectionData(response),
    };
  } catch (error) {
    console.log({ error });
    return error;
  }
}

module.exports = {
  getFaceDetectionData,
};
