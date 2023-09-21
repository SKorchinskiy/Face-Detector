import type { ImageMetaData, DetectedFace } from "@/app/detect/image/[id]/page";
import FaceCanvas from "../face-canvas/face-canvas.component";

type FaceCanvasListProps = {
  imageMetaData: ImageMetaData;
  imageShortenerValue: number;
};

export default function FaceCanvasList({
  imageMetaData,
  imageShortenerValue,
}: FaceCanvasListProps) {
  return (
    <>
      <p>Faces detected: {imageMetaData.face_count}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          width: `700px`,
          height: 250,
          overflow: "scroll",
        }}
      >
        {imageMetaData.detected_faces.map(
          ({ bounding_box, probability }: DetectedFace, index) => {
            const width =
              ((bounding_box["right_col"] - bounding_box["left_col"]) *
                imageMetaData.width) /
              imageShortenerValue;
            const height =
              ((bounding_box["bottom_row"] - bounding_box["top_row"]) *
                imageMetaData.height) /
              imageShortenerValue;
            const marginLeft =
              (bounding_box["left_col"] * imageMetaData.width) /
              imageShortenerValue;
            const marginTop =
              (bounding_box["top_row"] * imageMetaData.height) /
              imageShortenerValue;

            return (
              <FaceCanvas
                key={index}
                id={index}
                image_src={imageMetaData.image_url}
                image_width={width}
                image_height={height}
                margin_left={marginLeft}
                margin_top={marginTop}
                face_count={imageMetaData.face_count}
              />
            );
          }
        )}
      </div>
    </>
  );
}
