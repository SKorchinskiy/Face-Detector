import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { Pagination } from "../pagination-bar/pagination-bar.component";
import BackwardPagination from "./backward-pagination.component";

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

describe("Backward-Pagination component", () => {
  it("should not add page buttons if on last page", () => {
    render(
      <BackwardPagination
        {...{ currentPage: 1, hasPrev: false, prevPage: 1, pages: 1 }}
      />
    );

    const pageButtons = screen.queryAllByRole("button", { name: /[0-9]/ });

    expect(pageButtons).toHaveLength(0);
  });

  it("should add 2 pages before current one", () => {
    render(
      <BackwardPagination
        {...{ currentPage: 3, hasPrev: true, prevPage: 2, pages: 3 }}
      />
    );

    const pageButtons = screen.queryAllByRole("button", { name: /[0-9]/ });

    expect(pageButtons).toHaveLength(2);
  });

  it("should hide more than 2 pages before current one", () => {
    render(
      <BackwardPagination
        {...{ currentPage: 4, hasPrev: true, prevPage: 3, pages: 4 }}
      />
    );

    const pageButtons = screen.queryAllByRole("button", { name: /[0-9]/ });

    expect(pageButtons).toHaveLength(2);
    expect(screen.queryByText("..")).toBeInTheDocument();
  });
});
