"use client";

import { MouseEvent, useState } from "react";
import NavTag from "../nav-tag/nav-tag.component";
import type { TagElement } from "../tag/tag.component";

type TagListProps = {
  tags: Array<TagElement>;
};

export default function NavTagList({ tags }: TagListProps) {
  const [filter, setFilter] = useState(true);

  const toggleFilter = (event: MouseEvent<HTMLSpanElement>) => {
    setFilter(!filter);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {(filter ? tags.filter((_, index) => index < 5) : tags).map(
          (tag, index) => (
            <NavTag key={index} tag={tag} />
          )
        )}
        <span
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={toggleFilter}
        >
          show {filter ? "more" : "less"}...
        </span>
      </div>
    </>
  );
}
