import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import NavTagList, { TagListProps } from "./nav-tag-list.component";

const tagsStub: TagListProps = {
  tags: [
    { tag_name: "tag_1" },
    { tag_name: "tag_2" },
    { tag_name: "tag_3" },
    { tag_name: "tag_4" },
    { tag_name: "tag_5" },
    { tag_name: "tag_6" },
  ],
};

describe("Nav-Tag-List component", () => {
  describe("passed more than 5 tags", () => {
    it("should display 5 tags and hide the others", async () => {
      render(<NavTagList tags={tagsStub.tags} />);
      expect(screen.getAllByText(/^tag_/)).toHaveLength(5);

      expect(screen.getByText(/^show more/i)).toBeInTheDocument();

      await userEvent.click(screen.getByText(/^show more/i));
      await waitFor(() =>
        expect(screen.getAllByText(/^tag_/)).toHaveLength(tagsStub.tags.length)
      );
      expect(screen.queryByText(/^show more/i)).toBeNull();
      expect(screen.getByText(/^show less/i)).toBeInTheDocument();

      await userEvent.click(screen.getByText(/^show less/i));
      await waitFor(() => expect(screen.getAllByText(/^tag_/)).toHaveLength(5));
      expect(screen.queryByText(/^show less/i)).toBeNull();
      expect(screen.getByText(/^show more/i)).toBeInTheDocument();
    });
  });

  describe("passed not more than 5 tags", () => {
    it("should not show element for revealing more tags", () => {
      render(<NavTagList tags={tagsStub.tags.slice(0, 5)} />);
      expect(screen.getAllByText(/^tag_/)).toHaveLength(5);

      expect(screen.queryByText(/^show more/i)).toBeNull();
    });
  });
});
