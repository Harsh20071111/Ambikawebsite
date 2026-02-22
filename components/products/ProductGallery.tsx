"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  category: string;
  status: string;
}

export function ProductGallery({
  images,
  productName,
  category,
  status,
}: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Fallback if no images are provided
  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted flex flex-col items-center justify-center p-8 border border-border">
        <Image
          src="/logo.svg"
          alt="placeholder"
          width={80}
          height={80}
          className="opacity-30"
        />
        <p className="mt-4 font-medium opacity-50">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image View */}
      <div
        className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted/30 border border-border flex items-center justify-center group cursor-zoom-in"
        onClick={() => setIsLightboxOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsLightboxOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="View image fullscreen"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full p-8"
          >
            <Image
              src={images[currentIndex]}
              alt={`${productName} - View ${currentIndex + 1}`}
              fill
              className="object-contain p-4 md:p-8 drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

        {/* Fullscreen icon */}
        <div className="absolute top-4 right-4 rounded-full bg-white/80 p-2.5 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:scale-110">
          <Maximize2 className="h-4 w-4 text-gray-700" />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {status === "New" && (
            <Badge className="bg-primary hover:bg-primary text-white font-semibold text-sm px-4 py-1.5 shadow-md">
              New Release
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="bg-white/90 backdrop-blur-sm text-black font-semibold text-sm px-4 py-1.5 shadow-md border-black/5"
          >
            {category}
          </Badge>
        </div>
      </div>

      {/* Thumbnails (Only show if multiple images exist) */}
      {images.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {images.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 snap-center ${currentIndex === index
                ? "border-primary shadow-md ring-2 ring-primary/20 scale-[1.02]"
                : "border-transparent bg-muted/50 hover:bg-muted opacity-60 hover:opacity-100"
                }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={images}
        currentIndex={currentIndex}
      />
    </div>
  );
}
