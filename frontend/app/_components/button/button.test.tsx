import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import Button from "./button.component";

describe("Button component", () => {
  describe("should render children", () => {
    it("JSX element", () => {
      const childComponent = <p>test text</p>;
      render(<Button>{childComponent}</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByText(/^test text$/i)).toBeInTheDocument();
    });
  });

  describe("clicked by user", () => {
    it("should trigger an onClick handler", async () => {
      const clickHandler = jest.fn();
      render(<Button clickHandler={clickHandler} />);
      await userEvent.click(screen.getByRole("button"));
      await waitFor(() => expect(clickHandler).toHaveBeenCalledTimes(1));
    });

    it("should be disabled", async () => {
      const clickHandler = jest.fn();
      render(<Button clickHandler={clickHandler} disabled />);
      await userEvent.click(screen.getByRole("button"));
      await waitFor(() => expect(clickHandler).toHaveBeenCalledTimes(0));
    });
  });
});
