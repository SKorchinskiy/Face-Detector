import { BoundingBox, ImageMetaData } from "../images/(image)/[id]/page";

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
