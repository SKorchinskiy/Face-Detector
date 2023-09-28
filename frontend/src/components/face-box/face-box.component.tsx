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
        border: "3px dashed #E1D7C6",
        boxSizing: "border-box",
        width: `${width}px`,
        height: `${height}px`,
        zIndex: 100,
        marginLeft: `${marginLeft}px`,
        marginTop: `${marginTop}px`,
      }}
    ></div>
  );
}
