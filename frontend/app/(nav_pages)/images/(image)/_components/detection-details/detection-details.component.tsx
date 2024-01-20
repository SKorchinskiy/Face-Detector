"use client";

import styles from "./detection-details.module.css";
import DescriptionList from "../../../../_components/ui/description-list/description-list.component";
import { DescriptionProps } from "../../../../_components/ui/description/description.component";
import { ImageMetaData } from "../../[id]/page";
import { useMemo } from "react";

function formatDetectionDetails(imageMetaData: ImageMetaData) {
  const expiration = imageMetaData.expiration || "-";
  const size = `${
    Math.round((imageMetaData.bytes / 1024 ** 2) * 10000) / 10000
  }mb`;
  const creation = imageMetaData.created_at;
  const url = imageMetaData.url;
  return { expiration, size, creation, url };
}

export default function DetectionDetails(imageMetaData: ImageMetaData) {
  const data = useMemo(
    () => formatDetectionDetails(imageMetaData),
    [imageMetaData]
  );

  return (
    <div className={styles["details-container"]}>
      <DescriptionList
        list={[
          ...Object.entries(data).map(
            (res: [string, string | number]): DescriptionProps => {
              return {
                name: res[0],
                value: res[1].toString(),
              };
            }
          ),
        ]}
      />
    </div>
  );
}
