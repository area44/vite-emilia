import { blurhashToDataUri } from "@unpic/placeholder";
import { Image } from "@unpic/react";
import React, { useMemo } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  hash?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  hash,
  width,
  height,
  className = "",
  loading = "lazy",
}) => {
  const placeholder = useMemo(() => {
    if (!hash) return undefined;
    try {
      return blurhashToDataUri(hash);
    } catch {
      return undefined;
    }
  }, [hash]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="fullWidth"
        loading={loading}
        className="block w-full"
        background={placeholder}
      />
    </div>
  );
};

export default OptimizedImage;
