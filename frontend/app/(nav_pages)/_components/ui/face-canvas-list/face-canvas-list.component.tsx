"use client";

import styles from "./face-canvas-list.module.css";
import type {
  ImageMetaData,
  DetectedFace,
} from "../../../images/(image)/[id]/page";
import FaceCanvas from "../face-canvas/face-canvas.component";
import { getPixelBorderValues } from "../../../_utils/image.utils";

type FaceCanvasListProps = {
  imagesMetaData: ImageMetaData[];
};

function FaceCanvasList({ imagesMetaData }: FaceCanvasListProps) {
  return imagesMetaData.map((imageMetaData, image_index) => (
    <div key={image_index} className={styles["canvas-list"]}>
      <p>Faces detected: {imageMetaData.face_count}</p>
      <div className={styles["canvas-list__container"]}>
        {imageMetaData.detected_faces.map(
          ({ bounding_box, probability }: DetectedFace, box_index) => {
            const { width, height, marginLeft, marginTop } =
              getPixelBorderValues(bounding_box, imageMetaData);

            return (
              <div
                key={box_index}
                className={styles["canvas-list__container_item"]}
              >
                <FaceCanvas
                  id={box_index}
                  canvasId={Math.round(Math.random() * 100)}
                  image_url={imageMetaData.url}
                  box_width={width}
                  box_height={height}
                  probability={probability}
                  box_left_margin={marginLeft}
                  box_top_margin={marginTop}
                />
                <div className={styles["canvas-list__container_details"]}>
                  <span>Face №: {box_index + 1}</span>
                  <p>
                    probability:{" "}
                    {probability ? Math.round(probability * 100) : "unknown"}%
                  </p>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  ));
}

export default FaceCanvasList;
