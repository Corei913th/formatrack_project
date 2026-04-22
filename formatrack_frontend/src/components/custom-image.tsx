import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CustomImageProps extends Omit<HTMLMotionProps<"img">, "src" | "alt"> {
  src: string;
  alt: string;
  className?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  className = "",
  ...props
}) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      className={`w-full h-full object-cover ${className}`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      {...props}
    />
  );
};

export default CustomImage;
