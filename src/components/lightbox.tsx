import React, { useEffect, useCallback, useRef } from "react";

import { CloseIcon, LeftArrowIcon, RightArrowIcon } from "@/components/icons";
import Image from "@/components/image";

interface LightboxProps {
  images: {
    url: string;
    name: string;
    hash?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
  }[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ images, index, onClose, onPrev, onNext }) => {
  const currentImage = images[index];
  const touchStartX = useRef<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext],
  );

  const handlerRef = useRef(handleKeyDown);
  handlerRef.current = handleKeyDown;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const listener = (e: KeyboardEvent) => handlerRef.current(e);
    window.addEventListener("keydown", listener);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", listener);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const touch = e.changedTouches[0];
    if (!touch) return;

    const touchEndX = touch.clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe distance of 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        onNext();
      } else {
        onPrev();
      }
    }

    touchStartX.current = null;
  };

  if (!currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
      className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 duration-300 md:p-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <button
        onClick={(e) => {
          e.currentTarget.blur();
          onClose();
        }}
        className="absolute top-4 right-4 z-[110] flex size-12 cursor-pointer items-center justify-center p-2 text-white/70 transition-colors hover:text-white focus:text-white"
        aria-label="Close lightbox"
      >
        <CloseIcon className="size-full" />
      </button>

      <div className="relative flex h-full w-full items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.blur();
            onPrev();
          }}
          className="absolute left-0 z-[110] hidden size-16 cursor-pointer p-4 text-white/50 transition-colors hover:text-white focus:text-white md:-left-12 md:left-0 md:block"
          aria-label="Previous image"
        >
          <LeftArrowIcon className="size-full" />
        </button>

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
            e.currentTarget.blur();
            onNext();
          }}
          className="absolute right-0 z-[110] hidden size-16 cursor-pointer p-4 text-white/50 transition-colors hover:text-white focus:text-white md:-right-12 md:right-0 md:block"
          aria-label="Next image"
        >
          <RightArrowIcon className="size-full" />
        </button>
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
