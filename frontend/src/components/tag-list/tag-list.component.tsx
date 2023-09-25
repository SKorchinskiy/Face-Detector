import Tag from "../tag/tag.component";
import type { TagElement } from "../tag/tag.component";

type TagListProps = {
  tags: Array<TagElement>;
};

export default function TagList({ tags }: TagListProps) {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
    >
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </div>
  );
}
