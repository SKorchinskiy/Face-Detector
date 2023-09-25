import type { ImageMetaData } from "@/app/images/(image)/[id]/page";
import Detection from "../detection/detection.component";

type DetectionListProps = {
  detections: ImageMetaData[];
};

export default function DetectionList({ detections }: DetectionListProps) {
  return (
    <>
      {detections.map((detection, index) => {
        const ratio = 200 / detection.height;
        const updatedDetection = {
          ...detection,
          height: detection.height * ratio,
          width: detection.width * ratio,
        };
        return <Detection key={index} detection={updatedDetection} />;
      })}
    </>
  );
}
