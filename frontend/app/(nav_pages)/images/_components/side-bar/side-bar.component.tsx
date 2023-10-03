import styles from "./side-bar.module.css";
import Button from "../../../../_components/button/button.component";
import TagList from "../../../_components/ui/tag-list/tag-list.component";
import React, {
  ChangeEvent,
  ForwardedRef,
  MouseEventHandler,
  forwardRef,
  useEffect,
  useState,
} from "react";

export type Section = {
  title?: string;
  elements: Array<{
    tag_name: string;
  }>;
};

export type SidebarProps = {
  sections: Section[];
  applyHandler: MouseEventHandler<HTMLButtonElement>;
  cancelHandler: MouseEventHandler<HTMLButtonElement>;
};

function Sidebar(
  { sections, applyHandler, cancelHandler }: SidebarProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const [search, setSearch] = useState("");
  const [filteredSections, setFilteredSections] = useState<Section[]>(sections);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setSearch(value);
  };

  useEffect(() => {
    setFilteredSections(
      sections.map((section) => {
        const filteredElements = section.elements.filter((element) =>
          element.tag_name.includes(search)
        );
        return {
          ...section,
          elements: filteredElements,
        };
      })
    );
  }, [search, sections]);

  return (
    <div className={styles["sidebar"]} ref={ref}>
      {filteredSections.map((section, index) => {
        return (
          <div key={index} style={{ width: "400px" }}>
            <div className={styles["sidebar__section"]}>
              <h3 className={styles["sidebar__section_title"]}>
                {section.title}
              </h3>
              <input
                type="search"
                placeholder="search a tag..."
                onChange={onSearchChange}
                className={styles["sidebar__search"]}
              ></input>
            </div>
            <hr />
            <div className={styles["sidebar__taglist"]}>
              <TagList tags={section.elements} />
            </div>
            <div className={styles["sidebar__buttons"]}>
              <Button
                className="back-and-forth-mini"
                clickHandler={cancelHandler}
              >
                Cancel
              </Button>
              <Button
                className="back-and-forth-mini"
                clickHandler={applyHandler}
              >
                Apply
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default forwardRef<HTMLDivElement, SidebarProps>(Sidebar);
