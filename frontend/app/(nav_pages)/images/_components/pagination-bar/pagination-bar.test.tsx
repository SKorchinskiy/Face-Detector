import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import PaginationBar, { Pagination } from "./pagination-bar.component";
import memoryRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

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

describe("Pagination-Bar component", () => {
  beforeEach(async () => {
    await memoryRouter.push("/images?page=1");
  });

  it("should disable prev and enable next buttons on first page", () => {
    render(<PaginationBar pagination={paginationStub} />);

    const { parentElement: prevButton } = screen.getByText(
      /prev/i
    ) as HTMLButtonElement;
    expect(prevButton).toBeDisabled();

    const { parentElement: nextButton } = screen.getByText(
      /next/i
    ) as HTMLButtonElement;
    expect(nextButton).not.toBeDisabled();
  });

  it("should enable prev and disable next buttons on last page", async () => {
    const { rerender } = render(<PaginationBar pagination={paginationStub} />);

    await userEvent.click(screen.getByText(paginationStub.pages.toString()));

    rerender(
      <PaginationBar
        pagination={{
          currentPage: 3,
          hasNext: false,
          hasPrev: true,
          pages: 3,
          nextPage: 3,
          prevPage: 2,
        }}
      />
    );
    const { parentElement: prevButton } = screen.getByText(
      /prev/i
    ) as HTMLButtonElement;
    expect(prevButton).not.toBeDisabled();

    const { parentElement: nextButton } = screen.getByText(
      /next/i
    ) as HTMLButtonElement;
    expect(nextButton).toBeDisabled();
  });

  it("should change url query params when navigating to another page", async () => {
    expect(memoryRouter.asPath).toBe("/images?page=1");
    render(<PaginationBar pagination={paginationStub} />, {
      wrapper: MemoryRouterProvider,
    });

    await userEvent.click(screen.getByText(paginationStub.pages.toString()));
    await waitFor(() => expect(memoryRouter.asPath).toBe("/images?page=3"));
  });

  it("should hide more than three pages", () => {
    render(
      <PaginationBar
        pagination={{
          ...paginationStub,
          pages: 4,
        }}
      />
    );

    const pageButtons = screen.getAllByRole("button", {
      name: /[0-9]/,
    });
    expect(pageButtons).toHaveLength(3);
  });
});
