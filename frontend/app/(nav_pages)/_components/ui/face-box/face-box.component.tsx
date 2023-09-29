import styles from "./face-box.module.css";

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
      className={styles["face-box"]}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        marginLeft: `${marginLeft}px`,
        marginTop: `${marginTop}px`,
      }}
    ></div>
  );
}
