"use client";

import { useMemo } from "react";
import BackwardPagination from "../backward-pagination/backward-pagination.component";
import ForwardPagination from "../forward-pagination/forward-pagination.component";
import NavButton from "../../../../_components/nav-button/nav-button.component";
import { useSearchParams } from "next/navigation";

export type Pagination = {
  hasPrev: boolean;
  hasNext: boolean;
  prevPage: number;
  currentPage: number;
  nextPage: number;
  pages: number;
};

export type PaginationBarProps = {
  pagination: Pagination;
};

export default function PaginationBar({ pagination }: PaginationBarProps) {
  const searchParams = useSearchParams();
  const cachedTags = useMemo(() => searchParams.get("tags"), [searchParams]);

  return (
    <div
      style={{
        width: "600px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <NavButton
        path={
          `images?page=${pagination.prevPage}` +
          (cachedTags ? `&tags=${cachedTags}` : "")
        }
        className="back-and-forth"
        disabled={!pagination.hasPrev}
      >
        <span>Prev</span>
      </NavButton>
      <BackwardPagination
        hasPrev={pagination.hasPrev}
        currentPage={pagination.currentPage}
        prevPage={pagination.prevPage}
      />
      <NavButton
        path={
          `images?page=${pagination.currentPage}` +
          (cachedTags ? `&tags=${cachedTags}` : "")
        }
        className="btn-paginate-active"
      >
        {pagination.currentPage}
      </NavButton>
      <ForwardPagination
        hasNext={pagination.hasNext}
        currentPage={pagination.currentPage}
        nextPage={pagination.nextPage}
        pages={pagination.pages}
      />
      <NavButton
        path={
          `images?page=${pagination.nextPage}` +
          (cachedTags ? `&tags=${cachedTags}` : "")
        }
        className="back-and-forth"
        disabled={!pagination.hasNext}
      >
        <span>Next</span>
      </NavButton>
    </div>
  );
}
