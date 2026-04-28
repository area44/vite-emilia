import React, { useEffect, useCallback } from "react";

import closeIcon from "../assets/close.svg?raw";
import leftArrowIcon from "../assets/left-arrow.svg?raw";
import rightArrowIcon from "../assets/right-arrow.svg?raw";
import Image from "./image";

interface LightboxProps {
  images: {
    url: string;
    name: string;
    hash?: string;
    width?: number;
    height?: number;
  }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onPrev, onNext }) => {
  const currentImage = images[index];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 duration-300 md:p-8"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] cursor-pointer p-2 text-white/70 transition-colors hover:text-white focus:text-white"
        aria-label="Close lightbox"
        dangerouslySetInnerHTML={{ __html: closeIcon }}
        style={{ width: "32px", height: "32px" }}
      />

      <div className="relative flex h-full w-full items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-0 z-[110] cursor-pointer p-4 text-white/50 transition-colors hover:text-white focus:text-white md:-left-12"
          aria-label="Previous image"
          dangerouslySetInnerHTML={{ __html: leftArrowIcon }}
          style={{ width: "64px", height: "64px" }}
        />

        <div className="relative max-h-full max-w-full overflow-hidden shadow-2xl">
          <Image
            src={currentImage.url}
            alt={currentImage.name}
            hash={currentImage.hash}
            width={currentImage.width}
            height={currentImage.height}
            className="max-h-[85vh] w-auto object-contain"
          />
          <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-center text-sm text-white/80">
            {index + 1} / {images.length} - {currentImage.name}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-0 z-[110] cursor-pointer p-4 text-white/50 transition-colors hover:text-white focus:text-white md:-right-12"
          aria-label="Next image"
          dangerouslySetInnerHTML={{ __html: rightArrowIcon }}
          style={{ width: "64px", height: "64px" }}
        />
      </div>

      <button
        className="absolute inset-0 z-0 cursor-default border-none bg-transparent p-0"
        onClick={onClose}
        aria-label="Close overlay"
        tabIndex={-1}
      />
    </div>
  );
};

export default Lightbox;
