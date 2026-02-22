"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex?: number; // Optional starting index
  onNext?: () => void; // Optional external navigation overrides
  onPrev?: () => void;
}

export function ImageLightbox({
  isOpen,
  onClose,
  images,
  currentIndex: externalIndex = 0,
  onNext,
  onPrev,
}: ImageLightboxProps) {
  const [internalIndex, setInternalIndex] = useState(externalIndex);

  // Sync internal index if external index changes while open
  useEffect(() => {
    setInternalIndex(externalIndex);
  }, [externalIndex]);

  const handleNext = useCallback(() => {
    if (onNext) {
      onNext();
    } else if (images.length > 1) {
      setInternalIndex((prev) => (prev + 1) % images.length);
    }
  }, [onNext, images.length]);

  const handlePrev = useCallback(() => {
    if (onPrev) {
      onPrev();
    } else if (images.length > 1) {
      setInternalIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  }, [onPrev, images.length]);

  // Handle keyboard events (Escape to close, arrows to navigate)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Prevent scrolling behind the modal
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="absolute top-6 right-6 z-[10000] rounded-full bg-white/10 p-2 text-white/70 backdrop-blur-xl transition-all hover:bg-white/20 hover:text-white pointer-events-auto cursor-pointer"
            aria-label="Close fullscreen view"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Previous Button */}
          {(images.length > 1 || onPrev) && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 z-[10000] rounded-full bg-black/50 p-3 text-white/70 backdrop-blur-xl transition-all hover:bg-black/80 hover:text-white sm:left-8 pointer-events-auto cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Main Image Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative h-full w-full max-h-screen p-4 sm:p-12 md:p-16 flex items-center justify-center pointer-events-none"
          >
            <div className="relative w-full h-full">
              <Image
                src={images[internalIndex]}
                alt={`Fullscreen view ${internalIndex + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="100vw"
                priority
                quality={90}
              />
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-sm font-medium tracking-widest text-white/90 backdrop-blur-md">
                {internalIndex + 1} / {images.length}
              </div>
            )}
          </motion.div>

          {/* Next Button */}
          {(images.length > 1 || onNext) && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 z-[10000] rounded-full bg-black/50 p-3 text-white/70 backdrop-blur-xl transition-all hover:bg-black/80 hover:text-white sm:right-8 pointer-events-auto cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
