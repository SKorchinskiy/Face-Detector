import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Pagination } from "../pagination-bar/pagination-bar.component";
import ForwardPagination from "./forward-pagination.component";

const paginationStub: Pagination = {
  currentPage: 1,
  hasNext: true,
  hasPrev: false,
  nextPage: 2,
  prevPage: 1,
  pages: 3,
};

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    useSearchParams: () => ({ get: jest.fn().mockReturnValue("") }),
  };
});

describe("Forward-Pagination component", () => {
  it("should not add page buttons if on last page", () => {
    render(
      <ForwardPagination
        {...{ currentPage: 1, hasNext: false, nextPage: 1, pages: 1 }}
      />
    );

    const pageButtons = screen.queryAllByRole("button", { name: /[0-9]/ });

    expect(pageButtons).toHaveLength(0);
  });

  it("should add 2 pages from current one", () => {
    render(
      <ForwardPagination
        {...{ currentPage: 1, hasNext: true, nextPage: 2, pages: 3 }}
      />
    );

    const pageButtons = screen.queryAllByRole("button", { name: /[0-9]/ });

    expect(pageButtons).toHaveLength(2);
  });

  it("should hide more than 2 pages from current one", () => {
    render(
      <ForwardPagination
        {...{ currentPage: 1, hasNext: true, nextPage: 2, pages: 4 }}
      />
    );

    const pageButtons = screen.queryAllByRole("button", { name: /[0-9]/ });

    expect(pageButtons).toHaveLength(2);
    expect(screen.queryByText("..")).toBeInTheDocument();
  });
});
