import Image from "next/image";

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
  const { imageUrl, bounding_box } = await response.json();
  const imgWidth = 500;
  const imgHeight = 500;
  const imgMargin = 500;
  const width =
    (bounding_box["right_col"] - bounding_box["left_col"]) * imgWidth;
  const height =
    (bounding_box["bottom_row"] - bounding_box["top_row"]) * imgHeight;
  const marginLeft = bounding_box["left_col"] * imgMargin;
  const marginTop = bounding_box["top_row"] * imgMargin;
  /*
    500 - 100%
    (top|left|bottom|right)_row - row * 100%
  */
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "500px",
          height: "500px",
        }}
      >
        <Image
          style={{
            position: "absolute",
            zIndex: 10,
          }}
          width={500}
          height={500}
          alt="face"
          src={imageUrl}
        />
        <div
          style={{
            position: "absolute",
            border: "5px solid black",
            width: `${width}px`,
            height: `${height}px`,
            zIndex: 100,
            marginLeft: `${marginLeft}px`,
            marginTop: `${marginTop}px`,
          }}
        ></div>
      </div>
    </div>
  );
}
