"use client";

import styles from "./tag.module.css";
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
  }, [tag]);

  return (
    <div
      id={`tag-name-${tag.tag_name}`}
      className={styles["tag-container"]}
      onClick={(event) => {
        setIsSelected((prev) => !prev);
        toggleTag(tag.tag_name);
        onClick && onClick(event);
      }}
    >
      <div
        className={styles["tag-container__item"]}
        style={{ background: isSelected ? "#352F44" : "#726A95" }}
      >
        <p>{tag.tag_name}</p>
      </div>
    </div>
  );
}
