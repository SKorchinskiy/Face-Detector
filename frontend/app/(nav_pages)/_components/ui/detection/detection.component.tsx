import styles from "./detection.module.css";

import { ImageMetaData } from "../../../images/(image)/[id]/page";
import Image from "next/image";
import Link from "next/link";

type DetectionProps = {
  detection: ImageMetaData;
};

export default function Detection({ detection }: DetectionProps) {
  return (
    <Link href={`/images/${detection.id}`}>
      <Image
        id="face-to-recognize"
        className={styles["detection-image"]}
        width={detection.width}
        height={detection.height}
        alt="face"
        src={detection.url}
      />
    </Link>
  );
}
