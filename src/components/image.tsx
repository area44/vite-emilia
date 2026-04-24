import React, { useState, useRef, useEffect } from "react";
import { Blurhash } from "react-blurhash";

interface ImageProps {
  src: string;
  alt: string;
  hash?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  hash,
  width,
  height,
  aspectRatio,
  className = "",
  loading = "lazy",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, [src]);

  const finalAspectRatio = aspectRatio || (width && height ? `${width} / ${height}` : undefined);

  return (
    <div
      className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
      style={{
        aspectRatio: finalAspectRatio,
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className="block h-full w-full object-cover transition-opacity duration-500"
      />
      {hash && (
        <div
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
          style={{ pointerEvents: "none" }}
        >
          <Blurhash
            hash={hash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
    </div>
  );
};

export default Image;
