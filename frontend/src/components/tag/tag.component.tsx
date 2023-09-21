import Image from "next/image";

export type TagElement = {
  tag_name: string;
  probability: number;
};

type TagProps = {
  tag: TagElement;
};

export default function Tag({ tag }: TagProps) {
  return (
    <div
      style={{
        margin: 10,
        width: "150px",
        height: "20px",
        overflow: "clip",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        alt="tag"
        src={"/tag.svg"}
        style={{
          width: "100%",
          height: "auto",
        }}
        width={0}
        height={0}
      />
      <div style={{ fontSize: 10, position: "absolute", color: "white" }}>
        <p>{tag.tag_name}</p>
      </div>
    </div>
  );
}
