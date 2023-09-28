"use client";

import styles from "./page.module.css";
import { fetchData } from "../_utils/fetch.util";

import type { ImageMetaData } from "./(image)/[id]/page";
import type { TagElement } from "../_components/ui/tag/tag.component";
import type { PaginationBarProps } from "./_components/pagination-bar/pagination-bar.component";

import DetectionList from "../_components/ui/detection-list/detection-list.component";
import PaginationBar from "./_components/pagination-bar/pagination-bar.component";
import React, {
  MouseEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Sidebar from "./_components/side-bar/side-bar.component";
import Image from "next/image";
import { TagsContext } from "../_context/tags.context";
import { useRouter } from "next/navigation";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { selectedTags, applyTags, cancelUpdate } = useContext(TagsContext);
  const router = useRouter();
  const pathname = usePathname();

  const parsePageOrReturnDefault = (page: string | null) => {
    if (!page || !Number.isInteger(Number(page))) return 1;
    const parsedPage = Number(page);
    return parsedPage > 0 ? parsedPage : 1;
  };

  const onClickHandler = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !target.contains(sidebarRef.current) &&
      !(sidebarRef.current as HTMLElement).contains(target)
    ) {
      cancelTagsHandler();
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const getTags = async () => {
      const url = `http://localhost:8000/images/tags/${100}`;
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

  const applyTagsHandler = () => {
    const appliedTags = applyTags();
    const stringified = appliedTags.toString();
    const params = new URLSearchParams(searchParams);
    if (stringified) params.set("tags", stringified);
    else params.delete("tags");
    const query = decodeURIComponent(params.toString());
    router.push(pathname + "?" + query);
    setIsSidebarOpen(false);
  };

  const cancelTagsHandler = () => {
    cancelUpdate();
    setIsSidebarOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        minHeight: "100%",
      }}
      onClick={onClickHandler}
    >
      {isSidebarOpen ? (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              background: "rgba(238, 238, 238, 0.4)",
              zIndex: 20,
            }}
          ></div>
          <Sidebar
            sections={[
              {
                title: "tags",
                elements: tags,
              },
            ]}
            ref={sidebarRef}
            applyHandler={applyTagsHandler}
            cancelHandler={cancelTagsHandler}
          />
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "40%",
            left: 0,
            zIndex: 30,
            cursor: "pointer",
          }}
          onClick={() => setIsSidebarOpen(true)}
        >
          <Image alt="toggle" src="/arrow-right.svg" width={50} height={50} />
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div className={styles["detections-container"]}>
          <div className={styles["detections-data"]}>
            <DetectionList detections={detections.recentDetections} />
          </div>
          <div className={styles["page-pagination"]}>
            <PaginationBar pagination={detections.pagination} />
          </div>
        </div>
      </div>
    </div>
  );
}
