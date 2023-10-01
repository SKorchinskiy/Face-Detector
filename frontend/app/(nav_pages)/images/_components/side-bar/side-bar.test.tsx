import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";

import SideBar, { Section } from "./side-bar.component";

describe("Side-Bar component", () => {
  it("should represent all elements", async () => {
    const applyHandler = jest.fn();
    const cancelHandler = jest.fn();
    const sections: Section[] = [
      {
        title: "Tags",
        elements: [
          { tag_name: "tag_1" },
          { tag_name: "tag_2" },
          { tag_name: "tag_3" },
          { tag_name: "tag_4" },
          { tag_name: "tag_5" },
        ],
      },
    ];
    const sideBarProps = { applyHandler, cancelHandler, sections };
    render(<SideBar {...sideBarProps} />);

    expect(screen.getAllByText(/^tag_/i)).toHaveLength(
      sections[0].elements.length
    );
  });

  it("should call appropriate event handlers when buttons are clicked", async () => {
    const applyHandler = jest.fn();
    const cancelHandler = jest.fn();
    const sections: Section[] = [
      {
        title: "Tags",
        elements: [
          { tag_name: "tag_1" },
          { tag_name: "tag_2" },
          { tag_name: "tag_3" },
          { tag_name: "tag_4" },
          { tag_name: "tag_5" },
        ],
      },
    ];
    const sideBarProps = { applyHandler, cancelHandler, sections };
    render(<SideBar {...sideBarProps} />);

    await userEvent.click(screen.getByText(/^apply$/i));
    await waitFor(() => expect(applyHandler).toHaveBeenCalledTimes(1));

    await userEvent.click(screen.getByText(/^cancel$/i));
    await waitFor(() => expect(cancelHandler).toHaveBeenCalledTimes(1));
  });

  it("should filter tags based on input", async () => {
    const applyHandler = jest.fn();
    const cancelHandler = jest.fn();
    const sections: Section[] = [
      {
        title: "Tags",
        elements: [
          { tag_name: "tag_1" },
          { tag_name: "tag_2" },
          { tag_name: "tag_3" },
          { tag_name: "tag_4" },
          { tag_name: "tag_5" },
        ],
      },
    ];
    const sideBarProps = { applyHandler, cancelHandler, sections };
    render(<SideBar {...sideBarProps} />);

    await userEvent.click(screen.getByPlaceholderText(/^search a tag/i));
    await userEvent.paste("1");
    await waitFor(() => expect(screen.getAllByText(/^tag_/i)).toHaveLength(1));
    await userEvent.paste("100000");
    await waitFor(() =>
      expect(screen.queryAllByText(/^tag_/i)).toHaveLength(0)
    );
  });
});
