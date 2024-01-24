import { DetectedFace, ImageMetaData } from "../../../images/(image)/[id]/page";
import FaceBox from "../face-box/face-box.component";

type FaceBoxListProps = {
  imageMetaData: ImageMetaData;
  imageShortenerValue: number;
};

export default function FaceBoxList({
  imageMetaData,
  imageShortenerValue,
}: FaceBoxListProps) {
  return (
    <>
      {imageMetaData.detected_faces.map(
        ({ bounding_box }: DetectedFace, index) => {
          const width =
            (bounding_box["right_col"] - bounding_box["left_col"]) *
            imageMetaData.width *
            imageShortenerValue;
          const height =
            (bounding_box["bottom_row"] - bounding_box["top_row"]) *
            imageMetaData.height *
            imageShortenerValue;
          const marginLeft =
            bounding_box["left_col"] *
            imageMetaData.width *
            imageShortenerValue;
          const marginTop =
            bounding_box["top_row"] *
            imageMetaData.height *
            imageShortenerValue;
          return (
            <FaceBox
              key={imageMetaData.id}
              id={imageMetaData.id}
              width={width}
              height={height}
              marginLeft={marginLeft}
              marginTop={marginTop}
            />
          );
        }
      )}
    </>
  );
}
