"use client";

import { fetchData } from "@/utils/fetch.util";
import Field from "../field/field.component";
import NavButton from "../nav-button/nav-button.component";
import styles from "./uploader.module.css";
import { DragEvent, Fragment, useEffect, useState } from "react";

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

type UploaderProps = {
  processUpload: (file: any) => Promise<string | number | void>;
};

export default function Uploader({ processUpload }: UploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [source, setSource] = useState<File>();

  useEffect(() => {
    const callServer = async () => {
      if (!source) return;
      const data = await source.arrayBuffer();
      const image = Buffer.from(data);
      const id = await fetchData({
        url: "http://localhost:8000/detect",
        options: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64: image }),
        },
      });
      await processUpload(id);
    };

    if (source) callServer();
  }, [source]);

  const onDropHandler = async (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    setSource(event.dataTransfer.files[0]);
    // const imageId = await processUpload(event.dataTransfer.files[0]);
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
      setSource(file);
      // const imageId = await processUpload(file);
    } catch (error) {
      console.error(error);
    } finally {
      setDragOver(false);
    }
  };

  return (
    <Fragment>
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
    </Fragment>
  );
}
