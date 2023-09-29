"use client";

import styles from "./page.module.css";
import { fetchData } from "../_utils/fetch.util";
import { useEffect, useState } from "react";
import { ImageMetaData } from "../images/(image)/[id]/page";
import FaceCanvasList from "../_components/ui/face-canvas-list/face-canvas-list.component";
import { compareImages, getDetectedImageId } from "../_utils/image.utils";
import Detection from "../_components/ui/detection/detection.component";
import ImageDrop from "../_components/image-drop/image-drop.component";
import { convertFileToBuffer } from "../_utils/converter.util";

const initialState = { detection: null };

export default function Compare() {
  const [firstImage, setFirstImage] = useState<{
    detection: ImageMetaData | null;
  }>(initialState);
  const [secondImage, setSecondImage] = useState<{
    detection: ImageMetaData | null;
  }>(initialState);
  const [similarity, setSimilarity] = useState<number>();

  useEffect(() => {
    const compare = async () => {
      if (firstImage.detection?.url && secondImage.detection?.url) {
        const similarityRate = await compareImages(
          firstImage.detection,
          secondImage.detection
        );
        setSimilarity(similarityRate);
      }
    };

    compare();
  }, [firstImage, secondImage]);

  const uploadImage =
    ({ isFirstImage }: { isFirstImage: boolean }) =>
    async (file: File) => {
      const base64 = await convertFileToBuffer(file);
      const id = await getDetectedImageId({ base64 });
      const detection: ImageMetaData = await fetchData({
        url: `http://localhost:8000/images/${id}`,
      });
      isFirstImage
        ? setFirstImage({ detection })
        : setSecondImage({ detection });
    };

  return (
    <div className={styles["comparison"]}>
      <div className={styles["comparison__images-upload"]}>
        <div className={styles["comparison__image-container"]}>
          {firstImage.detection?.url ? (
            <>
              <Detection detection={firstImage.detection} />
            </>
          ) : (
            <ImageDrop
              imageUploadHandler={uploadImage({ isFirstImage: true })}
            />
          )}
        </div>
        {Number.isInteger(similarity) ? (
          <div className={styles["comparison__result-container"]}>
            <p>Similarity is</p>
            <p>{similarity}%</p>
          </div>
        ) : (
          ""
        )}
        <div className={styles["comparison__image-container"]}>
          {secondImage.detection?.url ? (
            <Detection detection={secondImage.detection} />
          ) : (
            <ImageDrop
              imageUploadHandler={uploadImage({ isFirstImage: false })}
            />
          )}
        </div>
      </div>
      <div className={styles["comparison__details"]}>
        <div style={{ display: "flex" }}>
          {firstImage.detection && secondImage.detection ? (
            <FaceCanvasList
              imagesMetaData={[firstImage.detection, secondImage.detection]}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
