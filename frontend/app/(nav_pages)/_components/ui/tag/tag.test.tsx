import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import TagsProvider from "../../../_context/tags.context";
import Tag from "./tag.component";

describe("Tag component", () => {
  it("toggles when clicked", async () => {
    const spyOnClick = jest.fn();
    render(
      <TagsProvider>
        <Tag
          tag={{
            tag_name: "test tag",
          }}
          onClick={spyOnClick}
        />
      </TagsProvider>
    );
    const tag = screen.getByText("test tag").parentElement as HTMLDivElement;
    expect(tag).not.toBeNull();
    expect(tag).toBeInTheDocument();

    const initialBg = tag.style.background;
    await userEvent.click(tag);
    await waitFor(() => expect(tag.style.background).not.toEqual(initialBg));
    expect(spyOnClick).toHaveBeenCalledTimes(1);

    await userEvent.click(tag);
    await waitFor(() => expect(tag.style.background).toEqual(initialBg));
    expect(spyOnClick).toHaveBeenCalledTimes(2);
  });
});
