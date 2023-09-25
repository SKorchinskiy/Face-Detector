"use client";

import styles from "./page.module.css";

import Field from "@/components/field/field.component";
import ImageDrop from "@/components/image-drop/image-drop.component";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function Detect() {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const urlFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function enterKeyListener(event: KeyboardEvent) {
      if (event.key === "Enter") {
        if (!imageUrl) {
          urlFieldRef.current?.focus();
        } else {
          processUrlDetection(imageUrl).then((id) => {
            router.push(`/images/${id}`);
          });
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

  const processUrlDetection = async (url: string) => {
    const res = await fetch("http://localhost:8000/detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });
    const { id } = await res.json();
    return id;
  };

  const processFaceDetection = async (file: any) => {
    const data = await file.arrayBuffer();
    const image = Buffer.from(data);
    const res = await fetch("http://localhost:8000/detect", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ base64: image }),
    });
    const { id } = await res.json();
    return id;
  };

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
          type="url"
          placeholder="enter image url"
          value={imageUrl}
          className="image-detector"
          onFieldChange={onUrlFieldChange}
          ref={urlFieldRef}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "80%",
          }}
        >
          <ImageDrop processUpload={processFaceDetection} />
        </div>
      </div>
    </div>
  );
}
