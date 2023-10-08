import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles["loading"]}>
      <div className={styles["loading__container"]} />
      <div className={styles["loading__container"]}>
        <div className={styles["loading__heading"]}>
          <div className={styles["loading__heading_item"]} />
        </div>
        <div className={styles["loading__content"]}>
          {...Array.from(Array(6)).map((_, index) => (
            <div key={index} className={styles["loading__content_box"]}>
              <div className={styles["loading__image"]} />
              <div className={styles["loading__image-description"]}>
                <div className={styles["loading__image-description_item"]} />
                <div className={styles["loading__image-description_item"]} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
