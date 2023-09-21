const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");

const PAT = process.env.AI_PAT;
const USER_ID = process.env.AI_USER_ID;
const APP_ID = process.env.AI_APP_ID;
const MODEL_ID = process.env.AI_MODEL_ID;
const MODEL_VERSION_ID = process.env.AI_MODEL_VERSION_ID;
const GENERAL_MODEL_ID = process.env.AI_GENERAL_MODEL_ID;
const GENERAL_MODEL_VERSION_ID = process.env.AI_GENERAL_MODEL_VERSION_ID;

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();

metadata.set("authorization", "Key " + PAT);

module.exports = {
  PAT,
  USER_ID,
  APP_ID,
  MODEL_ID,
  MODEL_VERSION_ID,
  GENERAL_MODEL_ID,
  GENERAL_MODEL_VERSION_ID,
  metadata,
  stub,
};
