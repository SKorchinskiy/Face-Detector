import styles from "./tag-list.module.css";
import Tag from "../tag/tag.component";
import type { TagElement } from "../tag/tag.component";

type TagListProps = {
  tags: Array<TagElement>;
};

export default function TagList({ tags }: TagListProps) {
  return (
    <div className={styles["tag-list-container"]}>
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </div>
  );
}
