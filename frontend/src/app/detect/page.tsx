"use client";

import styles from "./page.module.css";

import Button from "@/components/button/button.component";
import Field from "@/components/field/field.component";
import ImageDrop from "@/components/image-drop/image-drop.component";
import Image from "next/image";

export default function Detect() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1 className={styles.headline}>Provide Image for Detection</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Field
          id="image-detector"
          type="text"
          placeholder="enter image url"
          value=""
          className="image-detector"
          onFieldChange={() => {}}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
          }}
        >
          <ImageDrop />
        </div>
      </div>
    </div>
  );
}
