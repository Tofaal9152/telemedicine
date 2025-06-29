"use client";

import imagePath from "@/constants/imagePath";
import clsx from "clsx";
import NextImage, { ImageProps } from "next/image";

type CustomImageProps = ImageProps & {
  className?: string;
  wrapperClassName?: string;
  withBlur?: boolean;
  fallbackSrc?: string;
};

const CustomImage = ({
  className,
  wrapperClassName,
  alt = "",
  withBlur = true,
  ...props
}: CustomImageProps) => {
  return (
    <div className={clsx("relative overflow-hidden", wrapperClassName)}>
      <NextImage
        {...props}
        alt={alt}
        src={props.src || imagePath.imageNotAvailable}
        className={clsx(
          className,
          "transition-opacity duration-1000 opacity-0",
          withBlur && "blur-sm"
        )}
        priority
        onLoad={(event) => {
          event.currentTarget.classList.remove("opacity-0", "blur-sm");
        }}
      />
    </div>
  );
};

export default CustomImage;
