"use client";

import { useEffect } from "react";

type FaceCanvasProps = {
  id: number;
  image_src: string;
  image_width: number;
  image_height: number;
  margin_left: number;
  margin_top: number;
  face_count: number;
};

export default function FaceCanvas({
  id,
  image_src,
  image_width,
  image_height,
  margin_left,
  margin_top,
  face_count,
}: FaceCanvasProps) {
  useEffect(() => {
    const image = document.getElementById(
      "face-to-recognize"
    ) as HTMLImageElement;
    cropRestrictedArea();
    function cropRestrictedArea() {
      const canvas = document.getElementById(`face-canvas-${id}`);
      canvas?.setAttribute("width", `${image_width}`);
      canvas?.setAttribute("height", `${image_height}`);
      const context = (canvas as HTMLCanvasElement).getContext("2d");
      const faceBox = document.getElementById(
        `face-box-${id}`
      ) as HTMLDivElement;
      const ratio = image_width / image_height;
      context?.drawImage(
        image,
        margin_left,
        margin_top,
        image_width + 20,
        image_height + 20,
        0,
        0,
        image_width,
        image_height
      );
    }
  }, []);
  return (
    <div
      style={{
        height: 100,
        margin: 10,
      }}
    >
      <span>Face {id + 1}: </span>
      <canvas id={`face-canvas-${id}`} style={{ height: "100%" }}></canvas>
    </div>
  );
}
