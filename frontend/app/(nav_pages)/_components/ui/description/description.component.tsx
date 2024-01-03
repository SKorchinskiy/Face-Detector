import styles from "./description.module.css";

export type DescriptionProps = {
  name: string;
  value: string;
};

export default function Description({ name, value }: DescriptionProps) {
  return (
    <div className={styles["description"]}>
      <div className={styles["description__item_left"]}>{name}</div>
      <div className={styles["description__item_right"]}>
        {name === "creation" ? new Date(value).toDateString() : value}
      </div>
    </div>
  );
}
