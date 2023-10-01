import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import Detection from "./detection.component";
import { ImageMetaData } from "../../../images/(image)/[id]/page";

const detection: ImageMetaData = {
  id: 159,
  url: "https://i.ibb.co/pRhv70v/eee9d517409e.jpg",
  detected_faces: [
    {
      bounding_box: {
        top_row: 0.1792648434638977,
        left_col: 0.3634551465511322,
        bottom_row: 0.7021378874778748,
        right_col: 0.6247045993804932,
      },
      probability: 0.999997615814209,
    },
  ],
  face_count: 1,
  bytes: 77376,
  expiration: 0,
  created_at: "2023-09-28T12:49:02.000Z",
  width: 300,
  height: 200,
  //   x_projection: 0.234556,
  //   y_projection: 0.397692,
};

describe("Detection component", () => {
  it("should render image which redirects to dedicated detection page", async () => {
    const initialPath = "/images";
    await mockRouter.push(initialPath);
    await waitFor(() => expect(mockRouter.asPath).toEqual(initialPath));
    render(<Detection detection={detection} />, {
      wrapper: MemoryRouterProvider,
    });

    const face = screen.getByAltText("face");
    await userEvent.click(face);
    expect(mockRouter.asPath).toEqual(`${initialPath}/${detection.id}`);
  });
});
