import Link from "next/link";
import styles from "./nav-tag.module.css";

export type TagElement = {
  tag_name: string;
};

type TagProps = {
  tag: TagElement;
};

export default function NavTag({ tag }: TagProps) {
  return (
    <Link
      href={`/images?tags=${tag.tag_name}`}
      style={{ textDecoration: "none" }}
    >
      <div
        id={`tag-name-${tag.tag_name}`}
        className={styles["nav-tag-container"]}
      >
        <div className={styles["nav-tag-container__item"]}>
          <p>{tag.tag_name}</p>
        </div>
      </div>
    </Link>
  );
}
