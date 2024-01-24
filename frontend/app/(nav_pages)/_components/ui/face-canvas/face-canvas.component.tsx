"use client";

import styles from "./face-canvas.module.css";
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
    const mountImage = async () => {
      await mountCanvas({ ...props, canvasId: canvasId.current });
    };

    mountImage();

    return () => {
      const target = document.getElementById(`face-canvas-${canvasId.current}`);
      target?.parentNode?.removeChild(target);
    };
  }, [props]);

  return (
    <div className={styles["canvas-container"]}>
      <canvas
        id={`face-canvas-${canvasId.current}`}
        className={styles["canvas-container_item"]}
      ></canvas>
    </div>
  );
}
