"use client";

import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export type TagElement = {
  tag_name: string;
};

type TagProps = {
  tag: TagElement;
};

export default function Tag({ tag }: TagProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      let paramValue = decodeURIComponent(params.get(name) || "");
      if (!paramValue) {
        params.set(name, value);
      } else if (!paramValue.includes(value)) {
        params.set(name, paramValue + `\,${value}`);
      } else {
        const replaceValue = paramValue.replace(
          RegExp(`,${value}|${value},|${value}`),
          ""
        );
        if (replaceValue) {
          params.set(name, replaceValue);
        } else {
          params.delete(name);
        }
      }
      return decodeURIComponent(params.toString());
    },
    [searchParams]
  );

  const handleRouteChange = (tag_name: string) => {
    router.push(`/images?${createQueryString("tags", tag_name)}`);
  };

  return (
    <div
      id={`tag-name-${tag.tag_name}`}
      style={{
        margin: 10,
        width: "150px",
        height: "20px",
        overflow: "clip",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={() => handleRouteChange(tag.tag_name)}
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
