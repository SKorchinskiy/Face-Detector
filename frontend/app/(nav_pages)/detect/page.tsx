"use client";

import styles from "./page.module.css";

import Field from "../_components/ui/field/field.component";
import ImageDrop from "../_components/image-drop/image-drop.component";
import { fetchData } from "../_utils/fetch.util";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import NavButton from "../../_components/ui/nav-button/nav-button.component";
import { convertFileToBuffer } from "../_utils/converter.util";
import { getDetectedImageId } from "../_utils/image.utils";

export default function Detect() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const urlFieldRef = useRef<HTMLInputElement>(null);

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

  const onUrlFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setImageUrl(value);
  };

  const imageUploadHandler = async (file: File) => {
    const base64 = await convertFileToBuffer(file);
    const id = await getDetectedImageId({ base64 });
    router.push(`/images/${id}`);
  };

  return (
    <div className={styles["detection-container"]}>
      <h1 className={styles.headline}>Provide Image for Detection</h1>
      <div className={styles["detection-container__body"]}>
        <div className={styles["detection-container__image-providers"]}>
          <Field
            id="image-detector"
            type="url"
            placeholder="enter image url"
            value={imageUrl}
            className="image-detector"
            onFieldChange={onUrlFieldChange}
            ref={urlFieldRef}
          />
          <ImageDrop imageUploadHandler={imageUploadHandler} />
        </div>
        <div className={styles["nav-buttons-container"]}>
          <NavButton className="back-and-forth" path="/">
            Back
          </NavButton>
          <NavButton className="back-and-forth" disabled path="/image">
            Detect
          </NavButton>
        </div>
      </div>
    </div>
  );
}
