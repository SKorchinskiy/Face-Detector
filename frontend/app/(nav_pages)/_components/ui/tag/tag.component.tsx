"use client";

import { TagsContext } from "../../../_context/tags.context";

import { MouseEvent, useContext, useEffect, useState } from "react";

export type TagElement = {
  tag_name: string;
};

type TagProps = {
  tag: TagElement;
  onClick?: (event: MouseEvent<HTMLDivElement>) => {};
};

export default function Tag({ tag, onClick }: TagProps) {
  const [isSelected, setIsSelected] = useState(false);
  const { selectedTags, toggleTag } = useContext(TagsContext);

  useEffect(() => {
    const isIncluded = selectedTags.includes(tag.tag_name);
    if (isIncluded) setIsSelected(isIncluded);
  }, []);

  return (
    <div
      id={`tag-name-${tag.tag_name}`}
      style={{
        margin: 10,
        width: "150px",
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={(event) => {
        setIsSelected((prev) => !prev);
        toggleTag(tag.tag_name);
        onClick && onClick(event);
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 13,
          color: "white",
          background: isSelected ? "#352F44" : "#726A95",
          width: "150px",
          height: "20px",
          borderRadius: "5px",
          boxShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        <p>{tag.tag_name}</p>
      </div>
    </div>
  );
}
