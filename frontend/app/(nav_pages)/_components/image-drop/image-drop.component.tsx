"use client";

import styles from "./image-drop.module.css";

import { DragEvent, useState } from "react";

import Field from "../ui/field/field.component";
import { ImageConfig } from "../../_configs/image.config";

type ImageDropProps = { imageUploadHandler: (file: File) => Promise<void> };

export default function ImageDrop({ imageUploadHandler }: ImageDropProps) {
  const [dragEnter, setDragEnter] = useState(false);

  const toggleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragEnter((prev) => !prev);
  };

  const onDropHandler = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragEnter(false);
    try {
      const imageFile = event.dataTransfer.files[0];
      await imageUploadHandler(imageFile);
    } catch (error) {
      console.error(error);
    }
  };

  const onUploadHandler = async () => {
    setDragEnter(true);
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker(
        ImageConfig
      );
      const imageFile = await fileHandle.getFile();
      setDragEnter(false);
      await imageUploadHandler(imageFile);
    } catch (error) {
      console.error(error);
      setDragEnter(false);
    }
  };

  return (
    <div
      className={`${styles["image-drop"]} ${
        dragEnter ? styles["drag-enter"] : ""
      }`}
      onDrop={onDropHandler}
      onClick={onUploadHandler}
      onDragEnter={toggleDragEnter}
      onDragLeave={toggleDragEnter}
    >
      <Field
        id="file-pick"
        type="file"
        placeholder=""
        value=""
        className="file-pick"
        onFieldChange={() => {}}
      />
      <div className={styles["image-drop__body"]}>
        <div className={styles["image-drop-element"]}>
          <p>Upload Image</p>
        </div>
        <p>OR</p>
        <p>Drag and Drop</p>
      </div>
    </div>
  );
}
