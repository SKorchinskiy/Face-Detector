"use client";

import styles from "./page.module.css";
import { fetchData } from "../_utils/fetch.util";
import { useEffect, useState } from "react";
import { ImageMetaData } from "../images/(image)/[id]/page";
import { compareImages, getDetectedImageId } from "../_utils/image.utils";
import Detection from "../_components/ui/detection/detection.component";
import ImageDrop from "../_components/image-drop/image-drop.component";
import { convertFileToBuffer } from "../_utils/converter.util";
import DescriptionList from "../_components/ui/description-list/description-list.component";
import Button from "../../_components/button/button.component";
import { MagnifyingGlass } from "react-loader-spinner";

export type SimilarityDetails = {
  parameters: number;
  identical: number;
  strongly_related: number;
  weakly_related: number;
  unrelated: number;
  neutral: number;
  distance: number;
};

export type Similarity = {
  similarity: number;
  dissimilarity: number;
  details: SimilarityDetails;
};

function formatComparisonData(
  comparison: Similarity
): Array<{ name: string; value: string }> {
  const {
    similarity,
    dissimilarity,
    details: {
      parameters,
      strongly_related,
      distance,
      neutral,
      unrelated,
      weakly_related,
    },
  } = comparison;
  return [
    { name: "Similarity", value: `${similarity}%` },
    { name: "Dissimilarity", value: `${dissimilarity}%` },
    { name: "Number of parameters", value: `${parameters}` },
    { name: "Strongly related facial features", value: `${strongly_related}` },
    { name: "Weakly related facial features", value: `${weakly_related}` },
    { name: "Neutral facial features", value: `${neutral}` },
    { name: "Unrelated facial features", value: `${unrelated}` },
    { name: "Distance between face clusters", value: `${distance}` },
  ];
}

const initialState = { detection: null };

export default function Compare() {
  const [firstImage, setFirstImage] = useState<{
    detection: ImageMetaData | null;
  }>(initialState);
  const [secondImage, setSecondImage] = useState<{
    detection: ImageMetaData | null;
  }>(initialState);
  const [comparison, setComparison] = useState<Similarity | null>();
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage =
    ({ isFirstImage }: { isFirstImage: boolean }) =>
    async (file: File) => {
      const base64 = await convertFileToBuffer(file);
      const id = await getDetectedImageId({ base64 });
      if (typeof id !== "undefined") {
        const detection: ImageMetaData = await fetchData({
          url: `https://skorchinskiy.pro:8000/images/${id}`,
        });
        if (detection)
          isFirstImage
            ? setFirstImage({ detection })
            : setSecondImage({ detection });
      }
    };

  useEffect(() => {
    if (comparison) setIsLoading(false);
  }, [comparison]);

  const compareImagesHandler = async () => {
    if (firstImage.detection?.url && secondImage.detection?.url) {
      setIsLoading(true);
      const similarityRate = await compareImages(
        firstImage.detection,
        secondImage.detection
      );
      if (similarityRate) setComparison(similarityRate);
    }
  };

  return (
    <div className={styles["comparison"]}>
      <div className={styles["comparison__info"]}>
        <div className={styles["comparison__info_item"]}>
          <h2>How does the comparison work ?</h2>
          <p>
            The presented comparison is performed by representing each of the
            provided images as embedding of length 512 using ML model. Those
            embeddings are compared using cosine similarity. In addition, an
            impact of each of the embedding parameter is calculated.
          </p>
        </div>
        <div className={styles["comparison__info_item"]}>
          <h2>Supported image formats</h2>
          <ul>
            <li>JPEG</li>
            <li>PNG</li>
            <li>TIFF</li>
            <li>BMP</li>
            <li>WEBP</li>
            <li>GIF</li>
          </ul>
        </div>
      </div>
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
        <div className={styles["comparison__action-buttons"]}>
          <Button
            className="back-and-forth"
            disabled={!firstImage.detection || !secondImage.detection}
            clickHandler={compareImagesHandler}
          >
            Compare
          </Button>
          <Button
            className="back-and-forth"
            disabled={!firstImage.detection && !secondImage.detection}
            clickHandler={() => {
              setFirstImage(initialState);
              setSecondImage(initialState);
              setComparison(null);
            }}
          >
            Retry
          </Button>
        </div>
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
      <div className={styles["comparison-result"]}>
        {isLoading ? (
          <div className={styles["loader"]}>
            <MagnifyingGlass
              visible={true}
              height="80"
              width="80"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#e15b64"
            />
          </div>
        ) : comparison ? (
          <div className={styles["comparison-result__container"]}>
            <DescriptionList list={formatComparisonData(comparison)} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
