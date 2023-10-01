import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import NavTag from "./nav-tag.component";
import TagsProvider from "../../../_context/tags.context";

const tagStub = { tag_name: "tested_tag" };

describe("Nav-Tag component", () => {
  describe("tag is clicked", () => {
    const initialPath = "/images";
    beforeEach(async () => {
      await mockRouter.push(initialPath);
    });

    it("should change pathname query params", async () => {
      expect(mockRouter.asPath).toEqual(initialPath);
      render(
        <TagsProvider>
          <NavTag tag={tagStub} />
        </TagsProvider>,
        {
          wrapper: MemoryRouterProvider,
        }
      );
      const spyOnClick = jest.fn();
      await userEvent.click(screen.getByText(tagStub.tag_name));
      await waitFor(() =>
        expect(mockRouter.asPath).toEqual(
          `${initialPath}?tags=${tagStub.tag_name}`
        )
      );
    });
  });
});
