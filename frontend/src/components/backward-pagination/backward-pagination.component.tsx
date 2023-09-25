import { useMemo } from "react";
import NavButton from "../nav-button/nav-button.component";
import { useSearchParams } from "next/navigation";

type BackwardPaginationProps = {
  hasPrev: boolean;
  currentPage: number;
  prevPage: number;
};

export default function BackwardPagination({
  hasPrev,
  currentPage,
  prevPage,
}: BackwardPaginationProps) {
  const searchParams = useSearchParams();
  const cachedTags = useMemo(() => searchParams.get("tags"), [searchParams]);

  return hasPrev ? (
    <>
      {prevPage !== 1 &&
        (prevPage - 1 === 1 ? (
          <NavButton
            path={
              `images?page=${prevPage - 1}` +
              (cachedTags ? `&tags=${cachedTags}` : "")
            }
            className="btn-paginate"
          >
            {prevPage - 1}
          </NavButton>
        ) : (
          <>
            <NavButton
              path={
                `images?page=${1}` + (cachedTags ? `&tags=${cachedTags}` : "")
              }
              className="btn-paginate"
            >
              {1}
            </NavButton>
            <div>..</div>
          </>
        ))}
      <NavButton
        path={
          `images?page=${prevPage}` + (cachedTags ? `&tags=${cachedTags}` : "")
        }
        className="btn-paginate"
      >
        {prevPage}
      </NavButton>
    </>
  ) : (
    <></>
  );
}
