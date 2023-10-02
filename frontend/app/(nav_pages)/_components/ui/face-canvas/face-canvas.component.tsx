"use client";

import { mountCanvas } from "../../../_utils/canvas.util";
import { useEffect, useRef } from "react";

export type FaceCanvasProps = {
  id: number;
  probability?: number;
  canvasId: string | number;
  image_url: string;
  box_width: number;
  box_height: number;
  box_left_margin: number;
  box_top_margin: number;
};

export default function FaceCanvas(props: FaceCanvasProps) {
  const canvasId = useRef(props.canvasId.toString());

  useEffect(() => {
    mountCanvas({ ...props, canvasId: canvasId.current });
  }, [props]);

  return (
    <div style={{ height: 100, width: 100, margin: 10 }}>
      <canvas
        id={`face-canvas-${canvasId.current}`}
        style={{ height: "100%" }}
      ></canvas>
    </div>
  );
}
