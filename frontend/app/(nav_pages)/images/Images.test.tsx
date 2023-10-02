import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import Images, { DEFAULT_RECENT_DETECTIONS } from "./page";
import TagsProvider, { TagsContext } from "../_context/tags.context";
import { RequestOptions } from "https";
import memoryRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

var searchParamsObject = Object.freeze({
  get: jest.fn().mockReturnValue(""),
});
var mockRouterPush = jest.fn();
var routerObject = Object.freeze({ push: mockRouterPush });

jest.mock("next/navigation", () => {
  const actual = jest.requireActual("next/navigation");
  return {
    ...actual,
    usePathname: () => "/images",
    useSearchParams: () => searchParamsObject,
    useRouter: jest.requireActual("next-router-mock").useRouter,
  };
});

jest.mock("../_utils/fetch.util", () => {
  return {
    fetchData: async ({
      url,
      options,
    }: {
      url: string;
      options: Partial<RequestOptions>;
    }) => {
      if (url.includes("tags")) {
        return [
          {
            count: 1,
            tag_name: "my_tag",
          },
        ];
      } else {
        return { ...DEFAULT_RECENT_DETECTIONS };
      }
    },
  };
});

describe("Images page", () => {
  describe("tags selection", () => {
    beforeEach(async () => {
      await memoryRouter.push("/images");
    });

    it("should add tag to selection when tag is clicked", async () => {
      expect(memoryRouter.asPath).toBe("/images");
      await waitFor(() =>
        render(
          <TagsProvider>
            <Images />
          </TagsProvider>,
          { wrapper: MemoryRouterProvider }
        )
      );

      expect(
        screen.queryByRole("img", { name: /toggle/i })
      ).toBeInTheDocument();
      await userEvent.click(screen.getByRole("img", { name: /toggle/i }));
      expect(screen.getByText(/apply/i)).toBeInTheDocument();
      await userEvent.click(screen.getByText(/my_tag/i));
      await userEvent.click(screen.getByText(/apply/i));

      expect(screen.queryByText(/apply/i)).toBeNull();
      expect(memoryRouter.asPath).toContain("my_tag");
    });

    it("should not apply tag when canceled is clicked", async () => {
      expect(memoryRouter.asPath).toBe("/images");
      await waitFor(() =>
        render(
          <TagsProvider>
            <Images />
          </TagsProvider>,
          { wrapper: MemoryRouterProvider }
        )
      );

      expect(
        screen.queryByRole("img", { name: /toggle/i })
      ).toBeInTheDocument();
      await userEvent.click(screen.getByRole("img", { name: /toggle/i }));

      expect(screen.getByText(/cancel/i)).toBeInTheDocument();
      await userEvent.click(screen.getByText(/my_tag/i));
      await userEvent.click(screen.getByText(/cancel/i));

      expect(screen.queryByText(/cancel/i)).toBeNull();
      expect(memoryRouter.asPath).not.toContain("my_tag");
    });
  });
});
