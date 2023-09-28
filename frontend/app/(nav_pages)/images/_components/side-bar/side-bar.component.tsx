import Button from "../../../../_components/ui/button/button.component";
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
    <div
      style={{
        display: "flex",
        position: "absolute",
        color: "white",
        width: "400px",
        height: "90vh",
        top: 0,
        flexDirection: "column",
        alignItems: "center",
        padding: "10px",
        background: "rgba(238, 238, 238, 0.9)",
        zIndex: 100,
      }}
      ref={ref}
    >
      {filteredSections.map((section, index) => {
        return (
          <div
            key={index}
            style={{
              width: "400px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <h3 style={{ color: "black", letterSpacing: "1px" }}>
                {section.title}
              </h3>
              <input
                type="search"
                placeholder="search a tag..."
                onChange={onSearchChange}
                style={{
                  position: "relative",
                  top: "2px",
                  width: "80%",
                  height: "30px",
                  border: "none",
                  borderRadius: "5px",
                }}
              ></input>
            </div>
            <hr />
            <div
              style={{
                position: "relative",
                height: "500px",
                overflow: "scroll",
              }}
            >
              <TagList tags={section.elements} />
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "10px",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
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
