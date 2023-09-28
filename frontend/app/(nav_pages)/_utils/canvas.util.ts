import { ImageMetaData } from "../images/(image)/[id]/page";

export type FaceCanvasProps = {
  id: number;
  canvasId: string;
  image_url: string;
  box_width: number;
  box_height: number;
  box_left_margin: number;
  box_top_margin: number;
};

export async function mountCanvas({
  id,
  canvasId,
  image_url,
  box_width,
  box_height,
  box_left_margin,
  box_top_margin,
}: FaceCanvasProps) {
  const image = new Image();
  return new Promise((resolve) => {
    image.src = image_url;
    image.crossOrigin = "Anonymous";

    image.addEventListener("load", () => {
      const canvas =
        (document.getElementById(
          `face-canvas-${canvasId}`
        ) as HTMLCanvasElement) || document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) return;

      canvas.setAttribute("width", `${box_width}`);
      canvas.setAttribute("height", `${box_height}`);

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
      const croppedData = canvas.toDataURL("image/jpeg").split(",")[1];
      resolve(croppedData);
    });
  });
}
