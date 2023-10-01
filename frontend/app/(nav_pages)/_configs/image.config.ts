import { MIMEType } from "util";

export type FileType = {
  description?: string;
  accept: {
    [key: typeof MIMEType.name]: string[];
  };
};

export type ConfigOptions = Partial<{
  multiple: boolean; // false
  excludeAcceptAllOption: boolean; // false
  types: Array<FileType>;
}>;

export const ImageConfig: ConfigOptions = {
  types: [
    {
      description: "Image",
      accept: {
        "image/*": [
          ".png",
          ".jpg",
          ".jpeg",
          ".tiff",
          ".bmp",
          ".webp",
          ".csv",
          ".tsv",
        ],
      },
    },
  ],
  excludeAcceptAllOption: true,
  multiple: false,
};
