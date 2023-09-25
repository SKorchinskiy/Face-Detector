"use client";

import styles from "./page.module.css";
import { fetchData } from "@/utils/fetch.util";

import type { ImageMetaData } from "../detect/image/[id]/page";
import type { TagElement } from "@/components/tag/tag.component";
import type { PaginationBarProps } from "@/components/pagination-bar/pagination-bar.component";

import DetectionList from "@/components/detection-list/detection-list.component";
import PaginationBar from "@/components/pagination-bar/pagination-bar.component";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TagList from "@/components/tag-list/tag-list.component";

type RecentDetections = {
  recentDetections: ImageMetaData[];
} & PaginationBarProps;

type Tag = { count: number } & TagElement;

const DEFAULT_RECENT_DETECTIONS: RecentDetections = {
  recentDetections: [],
  pagination: {
    hasPrev: false,
    hasNext: false,
    prevPage: 1,
    currentPage: 1,
    nextPage: 1,
    pages: 1,
  },
};

export default function Imges() {
  const searchParams = useSearchParams();
  const [detections, setDetections] = useState<RecentDetections>(
    DEFAULT_RECENT_DETECTIONS
  );
  const [tags, setTags] = useState<Tag[]>([]);

  const parsePageOrReturnDefault = (page: string | null) => {
    if (!page || !Number.isInteger(Number(page))) return 1;
    const parsedPage = Number(page);
    return parsedPage > 0 ? parsedPage : 1;
  };

  useEffect(() => {
    const getTags = async () => {
      const url = `http://localhost:8000/images/tags/${10}`;
      const topTags = await fetchData({ url });
      setTags(topTags);
    };

    getTags();
  }, []);

  useEffect(() => {
    const currentPage = parsePageOrReturnDefault(searchParams.get("page"));
    const fetchImages = async () => {
      const tags = searchParams.get("tags");
      const url =
        `http://localhost:8000/images/recent?page=${currentPage}&limit=${8}` +
        (tags ? `&tags=${tags}` : "");
      const options = { method: "GET" };
      const { recentDetections, pagination }: RecentDetections =
        await fetchData({ url, options });
      setDetections({ recentDetections, pagination });
    };

    fetchImages();
  }, [searchParams]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className={styles["detections-container"]}>
        <div className={styles["tags-container"]}>
          <TagList tags={tags} />
        </div>
        <div className={styles["detections-data"]}>
          <DetectionList detections={detections.recentDetections} />
        </div>
        <div className={styles["page-pagination"]}>
          <PaginationBar pagination={detections.pagination} />
        </div>
      </div>
    </div>
  );
}
