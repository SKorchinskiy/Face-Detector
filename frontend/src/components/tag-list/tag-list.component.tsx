import Tag from "../tag/tag.component";
import type { TagElement } from "../tag/tag.component";

type TagListProps = {
  tags: Array<TagElement>;
};

export default function TagList({ tags }: TagListProps) {
  const filteredTags = tags
    .filter((tag) => tag.tag_name.length < 10)
    .filter((_, index) => index < 5);
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {filteredTags.map((tag, index) => (
        <Tag key={index} tag={tag} />
      ))}
    </div>
  );
}
