import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home page", () => {
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
});
