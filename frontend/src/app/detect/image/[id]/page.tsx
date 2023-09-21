import FaceBoxList from "@/components/face-box-list/face-box-list.component";
import FaceCanvasList from "@/components/face-canvas-list/face-canvas-list.component";
import TagList from "@/components/tag-list/tag-list.component";
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
  image_url: string;
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
  const response = await fetch(`http://localhost:8000/detect/${params.id}`, {
    method: "GET",
  });
  const imageMetaData: ImageMetaData = await response.json();
  const imageShortenerValue = imageMetaData.width / (2 * 400);

  const recommendations = await (
    await fetch(`http://localhost:8000/detect/recent/8`, {
      method: "GET",
    })
  ).json();
  const recentDetections: ImageMetaData[] = recommendations.data;
  const tags = await (
    await fetch(`http://localhost:8000/detect/image/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url: imageMetaData.image_url }),
    })
  ).json();

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
            width={imageMetaData.width / (imageShortenerValue * 2)}
            height={imageMetaData.height / (imageShortenerValue * 2)}
            alt="face"
            src={imageMetaData.image_url}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
            }}
          >
            <FaceBoxList
              imageMetaData={imageMetaData}
              imageShortenerValue={imageShortenerValue * 2}
            />
          </div>
        </div>
        <div
          style={{
            marginLeft: 50,
          }}
        >
          <FaceCanvasList
            imageMetaData={imageMetaData}
            imageShortenerValue={imageShortenerValue}
          />
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
        <TagList tags={tags.data} />
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
          <p>origin url: {imageMetaData.image_url}</p>
        </div>
      </div>
      <div style={{ margin: 50 }}>
        <h2>Recent detections</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {recentDetections.map((detection, index) => {
            const ratio = detection.width / detection.height;
            return (
              <Link key={index} href={`/detect/image/${detection.id}`}>
                <div style={{ width: 200, overflow: "clip" }}>
                  <Image
                    id="face-to-recognize"
                    style={{
                      zIndex: 10,
                      position: "relative",
                      margin: 10,
                    }}
                    width={200 * ratio}
                    height={200}
                    alt="face"
                    src={detection.image_url}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
