import FaceBoxList from "@/components/face-box-list/face-box-list.component";
import FaceCanvasList from "@/components/face-canvas-list/face-canvas-list.component";
import TagList from "@/components/tag-list/tag-list.component";
import { fetchData } from "@/utils/fetch.util";
import Image from "next/image";
import Link from "next/link";

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
  const tags = await fetchData({
    url: `http://localhost:8000/images/${params.id}/tags`,
    options: { method: "POST" },
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: 50,
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
            marginLeft: 50,
          }}
        >
          <FaceCanvasList imageMetaData={imageMetaData} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginLeft: 50,
        }}
      >
        <p>tags: </p>
        <TagList tags={tags} />
      </div>
      <div
        style={{
          width: "80%",
          margin: 50,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p>creation: {imageMetaData.created_at}</p>
          <p>
            size(mb):{" "}
            {Math.round((imageMetaData.bytes / 1024 ** 2) * 10000) / 10000}
          </p>
          <p>expires in: {imageMetaData.expiration || "-"}</p>
        </div>
        <div>
          <p>user: guest</p>
          <p>origin url: {imageMetaData.url}</p>
        </div>
      </div>
      <div style={{ margin: 50 }}>
        <h2>Similar detections</h2>
        <div
          style={{
            display: "grid",
            width: "100%",
            overflow: "clip",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {recentDetections.map((detection, index) => {
            const ratio = detection.width / detection.height;
            return (
              <Link key={index} href={`/detect/image/${detection.id}`}>
                <Image
                  id="face-to-recognize"
                  style={{
                    zIndex: 10,
                    position: "relative",
                    width: "95%",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  width={200 * ratio}
                  height={200}
                  alt="face"
                  src={detection.url}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
