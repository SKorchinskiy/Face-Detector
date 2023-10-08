import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles["loading"]}>
      <div className={styles["loading__container"]}>
        {...Array.from(Array(8)).map((_, index) => (
          <div key={index} className={styles["loading__container_item"]}></div>
        ))}
      </div>
    </div>
  );
}
