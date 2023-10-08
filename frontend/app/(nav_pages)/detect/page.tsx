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
import { MagnifyingGlass } from "react-loader-spinner";

type ImageInput = {
  url: string;
  base64: Buffer | null;
};

export default function Detect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParams = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams]
  );
  const [detectedImageId, setDetectedImageId] = useState();
  const [imageInput, setImageInput] = useState<ImageInput>({
    url: "",
    base64: null,
  });
  const urlFieldRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState<OptionType>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function enterKeyListener(event: KeyboardEvent) {
      if (event.key === "Enter" && imageInput.url) {
        urlFieldRef.current?.focus();
      }
    }

    window.addEventListener("keypress", enterKeyListener);
    return () => window.removeEventListener("keypress", enterKeyListener);
  }, [imageInput.url]);

  useEffect(() => {
    if (detectedImageId) router.push(`/images/${detectedImageId}`);
  }, [detectedImageId, router]);

  const selectedOptionHandler = (optionType: OptionType) =>
    setSelectedOption(optionType);

  const onUrlFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setImageInput((prev) => ({ ...prev, url: value }));
  };

  const imageUploadHandler = async (file: File) => {
    const base64 = await convertFileToBuffer(file);
    setImageInput((prev) => ({ ...prev, base64 }));
  };

  const imageDetectionHandler = async () => {
    setIsLoading(true);
    if (imageInput.url) {
      const id = await getDetectedImageId({ url: imageInput.url });
      setDetectedImageId(id);
    } else if (imageInput.base64) {
      const id = await getDetectedImageId({ base64: imageInput.base64 });
      setDetectedImageId(id);
    }
  };

  return (
    <div className={styles["detection-container"]}>
      {isLoading && (
        <div className={styles["loader"]}>
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="#e15b64"
          />
        </div>
      )}
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
            {urlParams.get("provider")?.toLowerCase() ===
            OptionType.URL.toLowerCase() ? (
              <Field
                id="image-detector"
                type="url"
                placeholder="enter image url"
                value={imageInput.url}
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
            path={!urlParams.get("provider") ? "/" : "/detect"}
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
              disabled={!imageInput.url && !imageInput.base64}
              path={`#`}
              clickHandler={imageDetectionHandler}
            >
              Detect
            </NavButton>
          )}
        </div>
      </div>
    </div>
  );
}
