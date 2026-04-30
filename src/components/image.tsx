import { decode } from "blurhash";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

const blurhashCache = new Map<string, Uint8ClampedArray>();

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface ImageProps {
  src: string;
  alt: string;
  hash?: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
  className?: string;
  loading?: "lazy" | "eager";
  crossOrigin?: "anonymous" | "use-credentials";
}

const Image: React.FC<ImageProps> = React.memo(
  ({
    src,
    alt,
    hash,
    width,
    height,
    aspectRatio,
    className = "",
    loading = "lazy",
    crossOrigin = "anonymous",
  }) => {
    // To avoid hidden images in static HTML, we must default to visible.
    // We only hide it on the client if we have a hash and it's not loaded yet.
    const [isLoaded, setIsLoaded] = useState(true);
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useIsomorphicLayoutEffect(() => {
      // On mount (client-side), check if we need to hide it for Blurhash
      const img = imgRef.current;
      if (img && hash && !img.complete) {
        setIsLoaded(false);
      }
    }, [hash]);

    useEffect(() => {
      if (!hash || !canvasRef.current) return;
      try {
        let pixels = blurhashCache.get(hash);
        if (!pixels) {
          pixels = decode(hash, 32, 32);
          blurhashCache.set(hash, pixels);
        }
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const imageData = ctx.createImageData(32, 32);
          imageData.data.set(pixels);
          ctx.putImageData(imageData, 0, 0);
        }
      } catch (err) {
        console.error("Blurhash error:", err);
      }
    }, [hash]);

    const finalAspectRatio = aspectRatio || (width && height ? `${width} / ${height}` : undefined);

    return (
      <div
        className={`relative overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
        style={{ aspectRatio: finalAspectRatio }}
      >
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={loading}
          crossOrigin={crossOrigin}
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className="block h-full w-full object-cover transition-opacity duration-500 ease-in-out"
          style={{
            opacity: isLoaded || !hash ? 1 : 0,
            position: "relative",
            zIndex: 2,
          }}
        />
        {hash && (
          <div
            aria-hidden="true"
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
            style={{
              opacity: isLoaded ? 0 : 1,
              zIndex: 1,
              pointerEvents: "none",
              filter: "blur(20px)",
              transform: "scale(1.1)",
            }}
          >
            <canvas
              ref={canvasRef}
              width={32}
              height={32}
              style={{
                width: "100%",
                height: "100%",
                display: "block",
              }}
            />
          </div>
        )}
        <noscript>
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 block h-full w-full object-cover"
            style={{ zIndex: 10, opacity: 1 }}
          />
        </noscript>
      </div>
    );
  },
);

Image.displayName = "Image";

export default Image;
