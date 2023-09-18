"use client";

import styles from "./image-drop.module.css";

import Image from "next/image";
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

export default function ImageDrop() {
  const [image, setImage] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const router = useRouter();

  const onDropHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = URL.createObjectURL(event.dataTransfer.files[0]);
    setImage(file);
    setDragOver(false);
    console.log("here");
    router.push("detect/image/123");
  };

  const onDragOverEndHandler = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const onUploadHandler = async () => {
    const [fileHandle] = await (window as any).showOpenFilePicker(dropOptions);
    const file = await fileHandle.getFile();
    for (let val in file) {
      console.log(val, file[val]);
    }
    console.log("here", URL.createObjectURL(file));
    setImage(URL.createObjectURL(file));
    router.push("detect/image/123");
  };

  return (
    <Fragment>
      {image ? <div className={styles["loading-effect"]}></div> : <></>}
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
      {image && (
        <Image
          src={image}
          alt="image"
          style={{
            position: "absolute",
            bottom: "50px",
          }}
          width="100"
          height="100"
        />
      )}
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
