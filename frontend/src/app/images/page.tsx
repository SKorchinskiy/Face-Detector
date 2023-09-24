"use client";

import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchData } from "@/utils/fetch.util";
import Link from "next/link";
import { ImageMetaData } from "../detect/image/[id]/page";
import Image from "next/image";
import NavButton from "@/components/nav-button/nav-button.component";

type Pagination = {
  hasPrev: boolean;
  hasNext: boolean;
  nextPage: number;
  prevPage: number;
  pages: number;
};

const DEFAULT_PAGINATION: Pagination = {
  hasPrev: false,
  hasNext: false,
  nextPage: 1,
  prevPage: 1,
  pages: 1,
};

const DEFAULT_PAGE = "1";

function isValidPage(page: string | null, pages: number) {
  return (
    !!page &&
    Number.isInteger(Number(page)) &&
    Number(page) > 0 &&
    Number(page) <= pages
  );
}

function prevPage(page: string | null) {
  if (!page) {
    return 1;
  }
  const current = Number(page);
  return current > 1 ? current - 1 : 1;
}

export default function Imges() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [detections, setDetections] = useState<ImageMetaData[]>([]);
  const [pagination, setPagination] = useState<Pagination>(DEFAULT_PAGINATION);

  const page = searchParams.get("page");
  useEffect(() => {
    const isValid = isValidPage(page, pagination.pages);

    if (!isValid) {
      router.push(`/images?page=${DEFAULT_PAGE}`);
    }
  }, [page, pagination, router]);

  useEffect(() => {
    const fetchRecentDetections = async () => {
      const url = `http://localhost:8000/images/recent?page=${page}&limit=${12}`;
      const options: RequestInit = {
        method: "GET",
      };
      const { recentDetections, ...pagination } = await fetchData({
        url,
        options,
      });
      const prevPage = pagination.hasPrev ? Number(page) - 1 : Number(page);
      const nextPage = pagination.hasNext ? Number(page) + 1 : Number(page);

      setPagination({ ...pagination, prevPage, nextPage });
      setDetections(recentDetections);
    };
    if (isValidPage(page, pagination.pages)) fetchRecentDetections();
  }, [page, pagination]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <NavButton
          path={`images?page=${prevPage(page)}`}
          className="back-and-forth"
          disabled={!pagination.hasPrev}
        >
          {pagination.prevPage}
        </NavButton>
        <div className={styles.headline}>
          <h1>Page: {page}</h1>
        </div>
        <NavButton
          path={`images?page=${Number(page) + 1}`}
          className="back-and-forth"
          disabled={!pagination.hasNext}
        >
          {pagination.nextPage}
        </NavButton>
      </div>
      <div className={styles["detections-container"]}>
        <div className={styles["detections-data"]}>
          {detections.map((detection, index) => {
            const ratio = 200 / detection.height;
            return (
              <Link key={index} href={`/detect/image/${detection.id}`}>
                <div key={index} className={styles["detection-container"]}>
                  <Image
                    id="face-to-recognize"
                    style={{
                      zIndex: 10,
                      position: "relative",
                    }}
                    width={detection.width * ratio}
                    height={detection.height * ratio}
                    alt="face"
                    src={detection.url}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
