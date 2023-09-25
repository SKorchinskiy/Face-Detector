"use client";

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
      style={{
        margin: 10,
        width: "150px",
        height: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={(e) => router.push(`/images?tags=${tag.tag_name}`)}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 13,
          color: "white",
          background: "#726A95",
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
