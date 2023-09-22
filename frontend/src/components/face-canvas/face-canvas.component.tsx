"use client";

import { useEffect } from "react";

type FaceCanvasProps = {
  id: number;
  box_width: number;
  box_height: number;
  box_left_margin: number;
  box_top_margin: number;
};

export default function FaceCanvas({
  id,
  box_width,
  box_height,
  box_left_margin,
  box_top_margin,
}: FaceCanvasProps) {
  useEffect(() => {
    const image = document.getElementById(
      "face-to-recognize"
    ) as HTMLImageElement;

    const tid = setInterval(() => {
      cropRestrictedArea();
      clearTimeout(tid);
    }, 500);

    function cropRestrictedArea() {
      const canvas = document.getElementById(`face-canvas-${id}`);
      canvas?.setAttribute("width", `${box_width}`);
      canvas?.setAttribute("height", `${box_height}`);
      const context = (canvas as HTMLCanvasElement).getContext("2d");
      context?.drawImage(
        image,
        box_left_margin,
        box_top_margin,
        box_width,
        box_height,
        0,
        0,
        box_width,
        box_height
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
