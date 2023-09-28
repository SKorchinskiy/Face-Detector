import type {
  ImageMetaData,
  DetectedFace,
} from "@/app/(side_pages)/images/(image)/[id]/page";
import FaceCanvas from "../face-canvas/face-canvas.component";
import { getPixelBorderValues } from "@/utils/image.utils";

type FaceCanvasListProps = {
  imageMetaData: ImageMetaData;
};

export default function FaceCanvasList({ imageMetaData }: FaceCanvasListProps) {
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <p>Faces detected: {imageMetaData.face_count}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
        }}
      >
        {imageMetaData.detected_faces.map(
          ({ bounding_box, probability }: DetectedFace, index) => {
            const { width, height, marginLeft, marginTop } =
              getPixelBorderValues(bounding_box, imageMetaData);
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                }}
              >
                <FaceCanvas
                  id={index}
                  image_url={imageMetaData.url}
                  box_width={width}
                  box_height={height}
                  box_left_margin={marginLeft}
                  box_top_margin={marginTop}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <span>Face №: {index + 1}</span>
                  <p>probability: {Math.round(probability * 100)}%</p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
