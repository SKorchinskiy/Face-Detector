import styles from "./page.module.css";

import DetectionList from "../../../_components/ui/detection-list/detection-list.component";
import FaceBoxList from "../../../_components/ui/face-box-list/face-box-list.component";
import FaceCanvasList from "../../../_components/ui/face-canvas-list/face-canvas-list.component";
import NavTagList from "../../../_components/ui/nav-tag-list/nav-tag-list.component";
import { fetchData } from "../../../_utils/fetch.util";
import Image from "next/image";
import DetectionDetails from "../_components/detection-details/detection-details.component";

export type BoundingBox = {
  top_row: number;
  right_col: number;
  bottom_row: number;
  left_col: number;
};

export type DetectedFace = {
  bounding_box: BoundingBox;
  probability: number;
};

export type ImageMetaData = {
  id: number;
  url: string;
  detected_faces: Array<DetectedFace>;
  face_count: number;
  bytes: number;
  expiration: number;
  width: number;
  height: number;
  created_at: string;
};

type ImageRecognitionProps = {
  params: {
    id: string;
  };
};

export default async function ImageRecognition({
  params,
}: ImageRecognitionProps) {
  const imageMetaData: ImageMetaData = await fetchData({
    url: `https://skorchinskiy.pro:8000/images/${params.id}`,
    options: {
      method: "GET",
    },
  });

  const imageShortenerValue =
    600 / Math.max(imageMetaData.width, imageMetaData.height);

  const recentDetections: ImageMetaData[] = await fetchData({
    url: `https://skorchinskiy.pro:8000/images/${params.id}/related`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: 8 }),
    },
  });

  const tags: { tag_name: string; probability: number }[] = await fetchData({
    url: `https://skorchinskiy.pro:8000/images/${params.id}/tags`,
    options: { method: "POST" },
  });

  return (
    <div className={styles["detection-container"]}>
      <div className={styles["detection-container__main"]}>
        <div className={styles["detection-image-container"]}>
          <img
            id="face-to-recognize"
            style={{ zIndex: 10, position: "relative" }}
            width={imageMetaData.width * imageShortenerValue}
            height={imageMetaData.height * imageShortenerValue}
            alt="face"
            src={imageMetaData.url}
          />
          <div className={styles["face-box-list"]}>
            <FaceBoxList
              imageMetaData={imageMetaData}
              imageShortenerValue={imageShortenerValue}
            />
          </div>
        </div>
        <div
          className={styles["canvas-list"]}
          style={{
            maxHeight: `${Math.floor(
              imageMetaData.height * imageShortenerValue
            )}px`,
          }}
        >
          <FaceCanvasList imagesMetaData={[imageMetaData]} />
        </div>
      </div>
      <div className={styles["tag-list-container"]}>
        <NavTagList tags={tags} />
      </div>
      <div className={styles["detection-details"]}>
        <DetectionDetails {...imageMetaData} />
      </div>
      <div className={styles["detection-list"]}>
        <h2>Similar detections</h2>
        <div className={styles["detection-list-container"]}>
          <DetectionList detections={recentDetections} />
        </div>
      </div>
    </div>
  );
}
