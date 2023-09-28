function setUpImageModel(config) {
  return async (data) => {
    try {
      const response = await new Promise((resolve, reject) =>
        config.stub.PostModelOutputs(
          {
            user_app_id: {
              user_id: config.USER_ID,
              app_id: config.APP_ID,
            },
            model_id: config.MODEL_ID,
            version_id: config.MODEL_VERSION_ID,
            inputs: [
              {
                data: { image: { ...data } },
              },
            ],
          },
          config.metadata,
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
      return response;
    } catch (error) {
      console.error({ error });
      return error;
    }
  };
}

module.exports = {
  setUpImageModel,
};
