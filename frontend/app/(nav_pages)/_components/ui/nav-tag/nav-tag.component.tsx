"use client";

import styles from "./nav-tag.module.css";
import { useRouter } from "next/navigation";

export type TagElement = {
  tag_name: string;
};

type TagProps = {
  tag: TagElement;
};

export default function NavTag({ tag }: TagProps) {
  const router = useRouter();

  return (
    <div
      id={`tag-name-${tag.tag_name}`}
      className={styles["nav-tag-container"]}
      onClick={(e) => router.push(`/images?tags=${tag.tag_name}`)}
    >
      <div className={styles["nav-tag-container__item"]}>
        <p>{tag.tag_name}</p>
      </div>
    </div>
  );
}
