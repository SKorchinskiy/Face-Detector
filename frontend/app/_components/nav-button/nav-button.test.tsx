import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import NavButton from "./nav-button.component";

describe("Nav-Button Component", () => {
  describe("navigation to provided path", () => {
    beforeEach(() => {
      mockRouter.setCurrentUrl("/");
    });

    it("should change current path", async () => {
      render(<NavButton path="/target" />, {
        wrapper: MemoryRouterProvider,
      });
      expect(screen.getByRole("button"));
      expect(mockRouter.asPath).toEqual("/");
      await userEvent.click(screen.getByRole("button"));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/target"));
    });

    it("shouldn't change current path", async () => {
      render(<NavButton disabled path="/target" />, {
        wrapper: MemoryRouterProvider,
      });
      expect(screen.getByRole("button"));
      expect(mockRouter.asPath).toEqual("/");
      await userEvent.click(screen.getByRole("button"));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/"));
    });
  });
});
