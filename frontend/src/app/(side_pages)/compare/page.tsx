"use client";

import Uploader from "@/components/uploader/uploader.component";
import { fetchData } from "@/utils/fetch.util";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ImageMetaData } from "../images/(image)/[id]/page";
import FaceCanvasList from "@/components/face-canvas-list/face-canvas-list.component";
import { mountCanvas } from "@/utils/canvas.util";
import { getPixelBorderValues } from "@/utils/image.utils";
import Button from "@/components/button/button.component";
import Detection from "@/components/detection/detection.component";
import FaceBox from "@/components/face-box/face-box.component";

const initialState = { detection: undefined };

export default function Compare() {
  const [firstImage, setFirstImage] = useState<{
    detection: ImageMetaData | undefined;
  }>(initialState);
  const [secondImage, setSecondImage] = useState<{
    detection: ImageMetaData | undefined;
  }>(initialState);
  const [similarity, setSimilarity] = useState<number | undefined>();

  useEffect(() => {
    const perform = async () => {
      if (firstImage.detection?.url && secondImage.detection?.url) {
        const firstPixelBorder = getPixelBorderValues(
          firstImage.detection.detected_faces.map(
            ({ bounding_box }) => bounding_box
          )[0],
          firstImage.detection
        );
        const secondPixelBorder = getPixelBorderValues(
          secondImage.detection.detected_faces.map(
            ({ bounding_box }) => bounding_box
          )[0],
          secondImage.detection
        );
        const firstFaceBuffer = (await mountCanvas({
          id: 1,
          canvasId: Math.round(Math.random()).toString(),
          image_url: firstImage.detection.url,
          box_width: firstPixelBorder.width,
          box_height: firstPixelBorder.height,
          box_left_margin: firstPixelBorder.marginLeft,
          box_top_margin: firstPixelBorder.marginTop,
        })) as string;
        const secondFaceBuffer = (await mountCanvas({
          id: 1,
          canvasId: Math.round(Math.random()).toString(),
          image_url: secondImage.detection.url,
          box_width: secondPixelBorder.width,
          box_height: secondPixelBorder.height,
          box_left_margin: secondPixelBorder.marginLeft,
          box_top_margin: secondPixelBorder.marginTop,
        })) as string;
        const comparisonResult = await fetchData({
          url: "http://localhost:8000/compare",
          options: {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              images: [
                { base64: firstFaceBuffer },
                { base64: secondFaceBuffer },
              ],
            }),
          },
        });
        setSimilarity(comparisonResult);
      }
    };

    perform();
  }, [firstImage, secondImage]);

  const uploadFirst = async (id: string | number) => {
    const detection: ImageMetaData = await fetchData({
      url: `http://localhost:8000/images/${id}`,
    });
    setFirstImage({ detection });
  };

  const uploadSecond = async (id: string | number) => {
    const detection: ImageMetaData = await fetchData({
      url: `http://localhost:8000/images/${id}`,
    });
    setSecondImage({ detection });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            padding: "30px",
            width: "80%",
            height: "300px",
          }}
        >
          <div>
            {firstImage.detection?.url ? (
              <>
                <Detection detection={firstImage.detection} />
              </>
            ) : (
              <Uploader processUpload={uploadFirst} />
            )}
          </div>
          {similarity !== undefined ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p>Similarity is</p>
              <p>{similarity}%</p>
            </div>
          ) : (
            ""
          )}
          <div>
            {secondImage.detection?.url ? (
              <Detection detection={secondImage.detection} />
            ) : (
              <Uploader processUpload={uploadSecond} />
            )}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "80%",
          marginLeft: "300px",
        }}
      >
        <div>
          {firstImage.detection ? (
            <FaceCanvasList imageMetaData={firstImage.detection} />
          ) : (
            ""
          )}
        </div>
        <div>
          {secondImage.detection ? (
            <FaceCanvasList imageMetaData={secondImage.detection} />
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <div
        style={{
          position: "absolute",
          bottom: "10px",
        }}
      >
        <Button className="btn-container">Compare</Button>
      </div> */}
    </div>
  );
}
