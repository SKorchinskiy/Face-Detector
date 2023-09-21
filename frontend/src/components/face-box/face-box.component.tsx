export default function FaceBox({
  id,
  width,
  height,
  marginLeft,
  marginTop,
}: {
  [key: string]: number;
}) {
  return (
    <div
      id={`face-box-${id}`}
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
  );
}
