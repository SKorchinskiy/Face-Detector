import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { screen, render, waitFor } from "@testing-library/react";
import ImageDrop from "./image-drop.component";
import { ConfigOptions } from "../../_configs/image.config";

const createImageWithType = (type: string): File =>
  new File([""], "face-image", {
    type,
    lastModified: 1695905740852,
  });

const spyGetFile = jest
  .fn()
  .mockReturnValue(new Error("Please, provide custom image type!"));

const showOpenFilePicker = jest
  .fn()
  .mockImplementation(async function (
    options: ConfigOptions
  ): Promise<FileSystemFileHandle[]> {
    const pickedFiles: FileSystemFileHandle[] = [
      {
        name: "face-image",
        kind: "file",
        getFile: spyGetFile,
        isSameEntry: jest.fn(),
        createWritable: jest.fn(),
      },
    ];
    const fileType =
      (await pickedFiles[0].getFile()).type.split(".").at(-1) || "";
    const isValidType =
      options &&
      options.types &&
      options.types[0].accept["image/*"].some(
        (type) => fileType.split("/")[1] === type.slice(1)
      );
    if (!isValidType) {
      throw new Error("Image type is not supported!");
    }
    return pickedFiles;
  });

describe("Image-Drop component", () => {
  describe("image file has been clicked and selected", () => {
    beforeEach(() => {
      (window as any).showOpenFilePicker = showOpenFilePicker;
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should call image upload handler with uploaded file", async () => {
      spyGetFile.mockReturnValue(createImageWithType("image/jpeg"));
      const file: File = new File([""], "face-image", {
        type: "image/jpeg",
        lastModified: 1695905740852,
      });
      const imageUploadHandler = jest.fn();

      render(<ImageDrop imageUploadHandler={imageUploadHandler} />);

      const imageDrop = screen.getByPlaceholderText("");
      await userEvent.upload(imageDrop, file);

      await waitFor(() =>
        expect(imageUploadHandler).toHaveBeenCalledWith(file)
      );
    });

    it("should not except the input type", async () => {
      spyGetFile.mockReturnValue(createImageWithType("image/avif"));
      const file: File = new File([""], "face-image", {
        type: "image/avif",
        lastModified: 1695905740852,
      });
      const imageUploadHandler = jest.fn();

      render(<ImageDrop imageUploadHandler={imageUploadHandler} />);

      const imageDrop = screen.getByPlaceholderText("");
      expect(() => userEvent.upload(imageDrop, file)).rejects.toThrow();
    });
  });
});
