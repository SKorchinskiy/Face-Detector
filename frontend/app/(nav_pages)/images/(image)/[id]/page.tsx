import DetectionList from "../../../_components/ui/detection-list/detection-list.component";
import FaceBoxList from "../../../_components/ui/face-box-list/face-box-list.component";
import FaceCanvasList from "../../../_components/ui/face-canvas-list/face-canvas-list.component";
import NavTagList from "../../../_components/ui/nav-tag-list/nav-tag-list.component";
import { fetchData } from "../../../_utils/fetch.util";
import Image from "next/image";

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

export default async function ImageRecognition({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const imageMetaData: ImageMetaData = await fetchData({
    url: `http://localhost:8000/images/${params.id}`,
  });
  const imageShortenerValue =
    600 / Math.max(imageMetaData.width, imageMetaData.height);
  const recentDetections: ImageMetaData[] = await fetchData({
    url: `http://localhost:8000/images/${params.id}/related`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ limit: 8 }),
    },
  });
  const tags: { tag_name: string; probability: number }[] = await fetchData({
    url: `http://localhost:8000/images/${params.id}/tags`,
    options: { method: "POST" },
  });
  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "relative",
          }}
        >
          <Image
            id="face-to-recognize"
            style={{
              zIndex: 10,
              position: "relative",
            }}
            width={imageMetaData.width * imageShortenerValue}
            height={imageMetaData.height * imageShortenerValue}
            alt="face"
            src={imageMetaData.url}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
            }}
          >
            <FaceBoxList
              imageMetaData={imageMetaData}
              imageShortenerValue={imageShortenerValue}
            />
          </div>
        </div>
        <div
          style={{
            maxHeight: `${Math.floor(
              imageMetaData.height * imageShortenerValue
            )}px`,
            marginLeft: 30,
            background: "#F8F4EA",
            overflow: "scroll",
            border: "1px solid black",
          }}
        >
          <FaceCanvasList imageMetaData={imageMetaData} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <NavTagList tags={tags} />
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        ></span>
      </div>
      <div
        style={{
          width: "80%",
          margin: 10,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
      </div>
      <div
        style={{
          marginTop: "50px",
        }}
      >
        <h2>Similar detections</h2>
        <div
          style={{
            display: "grid",
            width: "100%",
            overflow: "clip",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <DetectionList detections={recentDetections} />
        </div>
      </div>
    </div>
  );
}
