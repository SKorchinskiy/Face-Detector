"use client";

import styles from "./option-provider.module.css";
import Button from "../../../../_components/button/button.component";

export enum OptionType {
  URL = "URL",
  FILE = "FILE",
}

export default function OptionProvider({
  selectedOption,
  selectedOptionHandler,
}: {
  selectedOption: OptionType | undefined;
  selectedOptionHandler: Function;
}) {
  return (
    <div className={styles["option-provider"]}>
      <Button
        className={
          selectedOption && selectedOption === OptionType.URL
            ? "detection-option_selected"
            : "detect-option"
        }
        clickHandler={() => selectedOptionHandler(OptionType.URL)}
      >
        URL image provider
      </Button>
      <Button
        className={
          selectedOption && selectedOption === OptionType.FILE
            ? "detection-option_selected"
            : "detect-option"
        }
        clickHandler={() => selectedOptionHandler(OptionType.FILE)}
      >
        FILE image provider
      </Button>
    </div>
  );
}
