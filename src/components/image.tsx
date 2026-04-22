import React, { useState } from "react";
import { Blurhash } from "react-blurhash";

interface ImageProps {
  src: string;
  alt: string;
  hash?: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  hash,
  width,
  height,
  className = "",
  loading = "lazy",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: width && height ? `${width} / ${height}` : undefined,
      }}
    >
      {hash && !isLoaded && (
        <div className="absolute inset-0 z-0">
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
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        className={`block w-full transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default Image;
