import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Field from "./field.component";
import { ChangeEvent } from "react";

describe("Field component", () => {
  it("should represent typed content", async () => {
    const placeholder = "write text...";
    const templateText = "test text";
    const spyTypeHandler = jest
      .fn()
      .mockImplementation((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        expect(value).toEqual(templateText);
      });

    render(<Field onFieldChange={spyTypeHandler} placeholder={placeholder} />);

    expect(spyTypeHandler).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getByPlaceholderText(placeholder));
    await userEvent.paste(templateText);
    expect(spyTypeHandler).toHaveBeenCalledTimes(1);
  });
});
