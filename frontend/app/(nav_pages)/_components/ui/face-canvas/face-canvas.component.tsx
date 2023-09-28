"use client";

import { FaceCanvasProps, mountCanvas } from "../../../_utils/canvas.util";
import { useEffect, useRef, useState } from "react";

export default function FaceCanvas(props: Omit<FaceCanvasProps, "canvasId">) {
  const canvasId = useRef(Math.round(Math.random() * 1000).toString());

  useEffect(() => {
    mountCanvas({ ...props, canvasId: canvasId.current });
  }, [props]);
  return (
    <div
      style={{
        height: 100,
        margin: 10,
      }}
    >
      <canvas
        id={`face-canvas-${canvasId.current}`}
        style={{ height: "100%" }}
      ></canvas>
    </div>
  );
}
