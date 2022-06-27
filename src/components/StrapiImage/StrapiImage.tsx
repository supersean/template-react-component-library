import React from "react";
import {
  GatsbyImage,
  GatsbyImageProps,
  getImageData,
} from "gatsby-plugin-image";

export interface StrapiImageProps extends Omit<GatsbyImageProps, "image"> {
  image: StrapiImage;
  layout?: string;
  width?: number;
  height?: string;
  breakpoints?: [number];
}

export interface StrapiImage {
  data: {
    url: string;
    formats: StrapiFormats;
  };
  alt: string;
  height: number;
  width: number;
}

export interface StrapiFormats {
  large: StrapiFormat;
  medium: StrapiFormat;
  small: StrapiFormat;
}
export interface StrapiFormat {
  url: string;
  height: number;
  width: number;
}

function urlBuilder({ baseUrl, width, height, format, options }: any) {
  if (width < 501) {
    return baseUrl.formats.small.url;
  } else if (width < 701) {
    return baseUrl.formats.medium.url;
  } else if (width < 1001) {
    return baseUrl.formats.large.url;
  } else {
    return baseUrl.url;
  }
}

export function getExampleImageData({ image, ...props }: any) {
  return getImageData({
    baseUrl: image.data,
    sourceWidth: image.width,
    sourceHeight: image.height,
    urlBuilder,
    pluginName: "gatsby-source-example",
    formats: ["auto"],
    ...props,
  });
}

const StrapiImage = ({
  image,
  layout,
  width,
  height,
  breakpoints,
  ...props
}: StrapiImageProps) => {
  const imageData = getExampleImageData({
    image,
    width,
    height,
    breakpoints: [500, 700, 1000],
    layout: `constrained`,
    ...props,
  });
  return (
    <>
      <GatsbyImage image={imageData} {...props} />
    </>
  );
};

export default StrapiImage;
