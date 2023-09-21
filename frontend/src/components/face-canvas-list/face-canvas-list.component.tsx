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
            const ratio = imageMetaData.width < 400 ? 1 : imageShortenerValue;
            const width =
              ((bounding_box["right_col"] - bounding_box["left_col"]) *
                imageMetaData.width) /
              ratio;
            const height =
              ((bounding_box["bottom_row"] - bounding_box["top_row"]) *
                imageMetaData.height) /
              ratio;
            const marginLeft =
              (bounding_box["left_col"] * imageMetaData.width) / ratio;
            const marginTop =
              (bounding_box["top_row"] * imageMetaData.height) / ratio;

            return (
              <>
                <FaceCanvas
                  key={index}
                  id={index}
                  box_width={width}
                  box_height={height}
                  box_left_margin={marginLeft}
                  box_top_margin={marginTop}
                  face_count={imageMetaData.face_count}
                />
                <p>probability: {Math.round(probability * 1000) / 1000}</p>
              </>
            );
          }
        )}
      </div>
    </>
  );
}
