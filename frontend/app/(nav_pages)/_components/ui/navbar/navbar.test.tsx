import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import Navbar from "./navbar.component";

describe("Navbar component", () => {
  describe("link click", () => {
    it("should go to home page", async () => {
      await mockRouter.push("/detect");
      render(<Navbar />, { wrapper: MemoryRouterProvider });
      expect(mockRouter.asPath).toEqual("/detect");

      await userEvent.click(screen.getByText(/^face detector$/i));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/"));
    });

    it("should go to detection page", async () => {
      await mockRouter.push("/");
      render(<Navbar />, { wrapper: MemoryRouterProvider });
      expect(mockRouter.asPath).toEqual("/");
      await userEvent.click(screen.getByText(/^detect$/i));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/detect"));
    });

    it("should go to comparison page", async () => {
      await mockRouter.push("/");
      render(<Navbar />, { wrapper: MemoryRouterProvider });
      expect(mockRouter.asPath).toEqual("/");
      await userEvent.click(screen.getByText(/^compare$/i));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/compare"));
    });

    it("should go to images page", async () => {
      await mockRouter.push("/");
      render(<Navbar />, { wrapper: MemoryRouterProvider });
      expect(mockRouter.asPath).toEqual("/");
      await userEvent.click(screen.getByText(/^images$/i));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/images"));
    });

    it("should go to sign in page", async () => {
      await mockRouter.push("/");
      render(<Navbar />, { wrapper: MemoryRouterProvider });
      expect(mockRouter.asPath).toEqual("/");
      await userEvent.click(screen.getByText(/^sign in$/i));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/sign-in"));
    });

    it("should go to sign up page", async () => {
      await mockRouter.push("/");
      render(<Navbar />, { wrapper: MemoryRouterProvider });
      expect(mockRouter.asPath).toEqual("/");
      await userEvent.click(screen.getByText(/^sign up$/i));
      await waitFor(() => expect(mockRouter.asPath).toEqual("/sign-up"));
    });
  });
});
