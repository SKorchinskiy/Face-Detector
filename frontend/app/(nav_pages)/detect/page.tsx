"use client";

import styles from "./page.module.css";

import Field from "../_components/ui/field/field.component";
import ImageDrop from "../_components/image-drop/image-drop.component";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import NavButton from "../../_components/nav-button/nav-button.component";
import { convertFileToBuffer } from "../_utils/converter.util";
import { getDetectedImageId } from "../_utils/image.utils";
import OptionProvider, {
  OptionType,
} from "./_components/option-provider/option-provider.component";

export default function Detect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const [detectedImageId, setDetectedImageId] = useState();
  const [imageUrl, setImageUrl] = useState("");
  const urlFieldRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<OptionType>();

  useEffect(() => {
    async function enterKeyListener(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (!imageUrl) {
          urlFieldRef.current?.focus();
        } else {
          const id = await getDetectedImageId({ url: imageUrl });
          router.push(`/images/${id}`);
        }
      }
    }

    window.addEventListener("keypress", enterKeyListener);
    return () => window.removeEventListener("keypress", enterKeyListener);
  }, [imageUrl, router]);

  const selectedOptionHandler = (optionType: OptionType) =>
    setSelectedOption(optionType);

  const onUrlFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setImageUrl(value);
  };

  const imageUploadHandler = async (file: File) => {
    const base64 = await convertFileToBuffer(file);
    const id = await getDetectedImageId({ base64 });
    setDetectedImageId(id);
  };

  return (
    <div className={styles["detection-container"]}>
      <div className={styles["headline-container"]}>
        <h1 className={styles.headline}>Provide Image for Detection</h1>
      </div>
      <div className={styles["detection-container__body"]}>
        {!urlParams.get("provider") ? (
          <>
            <OptionProvider
              selectedOption={selectedOption}
              selectedOptionHandler={selectedOptionHandler}
            />
          </>
        ) : (
          <div className={styles["detection-container__image-providers"]}>
            {urlParams.get("provider") === OptionType.URL.toLowerCase() ? (
              <Field
                id="image-detector"
                type="url"
                placeholder="enter image url"
                value={imageUrl}
                className="image-detector"
                onFieldChange={onUrlFieldChange}
                ref={urlFieldRef}
              />
            ) : (
              <ImageDrop imageUploadHandler={imageUploadHandler} />
            )}
          </div>
        )}
        <div className={styles["nav-buttons-container"]}>
          <NavButton
            className="back-and-forth"
            path={!selectedOption ? "/" : "/detect"}
          >
            Back
          </NavButton>
          {!urlParams.get("provider") ? (
            <NavButton
              className="back-and-forth"
              disabled={!selectedOption}
              path={`/detect?provider=${selectedOption?.toLowerCase()}`}
            >
              Next
            </NavButton>
          ) : (
            <NavButton
              className="back-and-forth"
              disabled={!detectedImageId}
              path={`/images/${detectedImageId}`}
            >
              Detect
            </NavButton>
          )}
        </div>
      </div>
    </div>
  );
}
