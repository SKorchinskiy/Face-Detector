"use client";

import styles from "./image-drop.module.css";

import { DragEvent, Fragment, useState } from "react";
import Field from "../field/field.component";
import { useRouter } from "next/navigation";
import NavButton from "../nav-button/nav-button.component";

const dropOptions = {
  types: [
    {
      description: "Image",
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};

type ImageDropProps = {
  processUpload: (file: any) => Promise<string>;
};

export default function ImageDrop({ processUpload }: ImageDropProps) {
  const [dragOver, setDragOver] = useState(false);
  const router = useRouter();

  const onDropHandler = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const imageId = await processUpload(event.dataTransfer.files[0]);
    router.push(`images/${imageId}`);
  };

  const onDragOverEndHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const onUploadHandler = async () => {
    setDragOver(true);
    try {
      const [fileHandle] = await (window as any).showOpenFilePicker(
        dropOptions
      );
      const file = await fileHandle.getFile();
      const imageId = await processUpload(file);
      router.push(`images/${imageId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setDragOver(false);
    }
  };

  return (
    <Fragment>
      {/* {image ? <div className={styles["loading-effect"]}></div> : <></>} */}
      <div
        className={styles["image-drop-container"]}
        style={{
          background: dragOver ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.1)",
        }}
        onClick={onUploadHandler}
        onDrop={onDropHandler}
        onDragOver={onDragOverEndHandler}
        onDragLeave={onDragOverEndHandler}
      >
        <Field
          id="file-pick"
          type="file"
          onFieldChange={() => {}}
          className="file-pick"
          placeholder=""
          value=""
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "rgba(179, 92, 0)",
              padding: "10px",
              borderRadius: "10px",
            }}
            className={styles["image-drop-element"]}
          >
            Upload Image
          </div>
          <p>OR</p>
          <p>Drag and Drop</p>
        </div>
      </div>
      <div className={styles["nav-buttons-container"]}>
        <NavButton className="back-and-forth" path="/">
          Back
        </NavButton>
        <NavButton className="back-and-forth" path="/image">
          Next
        </NavButton>
      </div>
    </Fragment>
  );
}
