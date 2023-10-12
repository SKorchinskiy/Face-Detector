import { Similarity } from "../compare/page";
import {
  BoundingBox,
  DetectedFace,
  ImageMetaData,
} from "../images/(image)/[id]/page";
import { mountCanvas } from "./canvas.util";
import { fetchData } from "./fetch.util";

type ImageProvider = Partial<{
  base64: Buffer;
  url: string;
}>;

export function getPixelBorderValues(
  bounding_box: BoundingBox,
  imageMetaData: ImageMetaData
) {
  const width =
    (bounding_box["right_col"] - bounding_box["left_col"]) *
    imageMetaData.width;
  const height =
    (bounding_box["bottom_row"] - bounding_box["top_row"]) *
    imageMetaData.height;
  const marginLeft = bounding_box["left_col"] * imageMetaData.width;
  const marginTop = bounding_box["top_row"] * imageMetaData.height;

  return {
    width,
    height,
    marginLeft,
    marginTop,
  };
}

export async function getDetectedImageId(data: ImageProvider) {
  const id = await fetchData({
    url: "http://localhost:8000/detect",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data }),
    },
  });
  return id;
}

export async function getSimilarityResult(
  firstFaceData: { id: number; faceBuffer: Object },
  secondFaceData: { id: number; faceBuffer: Object }
) {
  return await fetchData({
    url: "http://localhost:8000/compare",
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        images: [firstFaceData, secondFaceData],
      }),
    },
  });
}

export function getBoundingBoxes(detected_faces: DetectedFace[]) {
  return detected_faces.map(({ bounding_box }) => bounding_box)[0];
}

function canvasDataFormatter(data: any) {
  return {
    box_width: data.width,
    box_height: data.height,
    box_left_margin: data.marginLeft,
    box_top_margin: data.marginTop,
  };
}

export async function compareImages(
  firstDetection: ImageMetaData,
  secondDetection: ImageMetaData
): Promise<Similarity> {
  const firstPixelBorder = getPixelBorderValues(
    getBoundingBoxes(firstDetection.detected_faces),
    firstDetection
  );
  const secondPixelBorder = getPixelBorderValues(
    getBoundingBoxes(secondDetection.detected_faces),
    secondDetection
  );
  const firstFaceBuffer = (await mountCanvas({
    id: 1,
    canvasId: Math.round(Math.random()).toString(),
    image_url: firstDetection.url,
    ...canvasDataFormatter(firstPixelBorder),
  })) as string;
  const secondFaceBuffer = (await mountCanvas({
    id: 1,
    canvasId: Math.round(Math.random()).toString(),
    image_url: secondDetection.url,
    ...canvasDataFormatter(secondPixelBorder),
  })) as string;

  const firstFaceData = {
    id: firstDetection.id,
    faceBuffer: { base64: firstFaceBuffer },
  };

  const secondFaceData = {
    id: secondDetection.id,
    faceBuffer: { base64: secondFaceBuffer },
  };

  const comparisonResult = await getSimilarityResult(
    firstFaceData,
    secondFaceData
  );
  return comparisonResult;
}
