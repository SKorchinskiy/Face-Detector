import { ImageMetaData } from "../../[id]/page";

export default function DetectionDetails(imageMetaData: ImageMetaData) {
  return (
    <div>
      <p>user: guest</p>
      <p>expires in: {imageMetaData.expiration || "-"}</p>
      <p>
        size(mb):{" "}
        {Math.round((imageMetaData.bytes / 1024 ** 2) * 10000) / 10000}
      </p>
      <p>creation: {imageMetaData.created_at}</p>
      <p>origin url: {imageMetaData.url}</p>
    </div>
  );
}
