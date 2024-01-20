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
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Sidebar from "./_components/side-bar/side-bar.component";
import Image from "next/image";
import { TagsContext } from "../_context/tags.context";

type RecentDetections = {
  recentDetections: ImageMetaData[];
} & PaginationBarProps;

export type Tag = { count: number } & TagElement;

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

export default function Images() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tags, setTags] = useState<Tag[]>([]);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { applyTags, cancelUpdate } = useContext(TagsContext);
  const [detections, setDetections] = useState<RecentDetections>(
    DEFAULT_RECENT_DETECTIONS
  );

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

  const applyTagsHandler = () => {
    const appliedTags = applyTags();
    const stringified = appliedTags.toString();
    const params = new URLSearchParams(searchParams);
    if (stringified) params.set("tags", stringified);
    else params.delete("tags");
    params.set("page", "1");
    const query = decodeURIComponent(params.toString());
    router.push(pathname + "?" + query);
    setIsSidebarOpen(false);
  };

  const cancelTagsHandler = () => {
    cancelUpdate();
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles["images-container"]} onClick={onClickHandler}>
      {isSidebarOpen ? (
        <>
          <div className={styles["overlapping-effect"]}></div>
          <Sidebar
            sections={[{ title: "tags", elements: tags }]}
            ref={sidebarRef}
            applyHandler={applyTagsHandler}
            cancelHandler={cancelTagsHandler}
          />
        </>
      ) : (
        <div
          className={styles["images-container__arrow"]}
          onClick={() => setIsSidebarOpen(true)}
        >
          <Image alt="toggle" src="/arrow-right.svg" width={50} height={50} />
        </div>
      )}
      <div className={styles["images-container__body"]}>
        <div className={styles["detections-container"]}>
          <div className={styles["detections-data"]}>
            <DetectionList detections={detections.recentDetections} />
          </div>
          <div style={{ width: "100%", height: "100px" }}>
            <div className={styles["page-pagination"]}>
              <PaginationBar pagination={detections.pagination} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
