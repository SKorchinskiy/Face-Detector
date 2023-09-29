export const ImageConfig = {
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
