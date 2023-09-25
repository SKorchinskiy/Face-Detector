import { ImageMetaData } from "@/app/detect/image/[id]/page";
import Image from "next/image";
import Link from "next/link";

type DetectionProps = {
  detection: ImageMetaData;
};

export default function Detection({ detection }: DetectionProps) {
  return (
    <Link href={`/detect/image/${detection.id}`}>
      <Image
        id="face-to-recognize"
        style={{
          zIndex: 10,
          position: "relative",
          width: "95%",
          height: "250px",
          objectFit: "cover",
        }}
        width={detection.width}
        height={detection.height}
        alt="face"
        src={detection.url}
      />
    </Link>
  );
}
