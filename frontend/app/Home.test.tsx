import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import memoryRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";

import Home from "./page";

describe("Home page", () => {
  beforeEach(async () => {
    await memoryRouter.push("/");
  });

  it("should render UI elements properly", async () => {
    render(<Home />);

    expect.assertions(5);

    expect(screen.getAllByAltText("face")).toHaveLength(2);
    expect(
      screen.getByText(/^detect faces using images$/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Try Now" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign Up" })).toBeInTheDocument();
    expect(
      screen.getByText(/^over 1\+ million users use face detector$/i)
    ).toBeInTheDocument();
  });

  it("should redirect to /detect page when appropriate button is clicked", async () => {
    expect(memoryRouter.asPath).toBe("/");
    render(<Home />, { wrapper: MemoryRouterProvider });

    await userEvent.click(screen.getByRole("button", { name: /try now/i }));
    expect(memoryRouter.asPath).toBe("/detect");
  });

  it("should redirect to /auth page when appropriate button is clicked", async () => {
    expect(memoryRouter.asPath).toBe("/");
    render(<Home />, { wrapper: MemoryRouterProvider });

    await userEvent.click(screen.getByRole("button", { name: /sign up/i }));
    expect(memoryRouter.asPath).toBe("/auth");
  });
});
