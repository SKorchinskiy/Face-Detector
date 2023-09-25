import { useSearchParams } from "next/navigation";
import NavButton from "../nav-button/nav-button.component";
import { useMemo } from "react";

type ForwardPaginationProps = {
  hasNext: boolean;
  currentPage: number;
  nextPage: number;
  pages: number;
};

export default function ForwardPagination({
  hasNext,
  currentPage,
  nextPage,
  pages,
}: ForwardPaginationProps) {
  const searchParams = useSearchParams();
  const cachedTags = useMemo(() => searchParams.get("tags"), [searchParams]);

  return hasNext ? (
    <>
      <NavButton
        path={
          `images?page=${nextPage}` + (cachedTags ? `&tags=${cachedTags}` : "")
        }
        className="btn-paginate"
      >
        {nextPage}
      </NavButton>
      {nextPage !== pages &&
        (nextPage + 1 === pages ? (
          <NavButton
            path={
              `images?page=${nextPage + 1}` +
              (cachedTags ? `&tags=${cachedTags}` : "")
            }
            className="btn-paginate"
          >
            {nextPage + 1}
          </NavButton>
        ) : (
          <>
            <div>..</div>
            <NavButton
              path={
                `images?page=${pages}` +
                (cachedTags ? `&tags=${cachedTags}` : "")
              }
              className="btn-paginate"
            >
              {pages}
            </NavButton>
          </>
        ))}
    </>
  ) : (
    <></>
  );
}
