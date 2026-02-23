"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";

type ComponentProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  status: string;
  imageUrl: string | null;
  images?: string[];
};

// Fallback products used if no database products are available
const fallbackProducts = [
  {
    id: "hydraulic-trolley",
    name: "HYDRAULIC",
    nameHighlight: "TROLLEY V-2",
    description:
      "Built for rough terrain. Engineered for maximum load capacity and rugged Indian farming conditions.",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2069&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2069&auto=format&fit=crop",
    ],
    badge: "New Arrival",
    badgeSecondary: "Heavy Duty",
    specs: [
      { value: "10", suffix: "+", label: "Ton Capacity" },
      { value: "Dual", suffix: "", label: "Axle System" },
      { value: "45", suffix: "°", label: "Tilt Angle" },
    ],
  },
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

export function ProductSlider({
  products = [],
}: {
  products?: ComponentProduct[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const isPaused = useRef(false);

  // Format DB products to match the slider's expected format, or use fallback
  const sliderProducts = useMemo(() => {
    if (!products || products.length === 0) return fallbackProducts;

    return products.slice(0, 5).map((p) => {
      // Split name to highlight the second part
      const nameParts = p.name.split(" ");
      const halfIndex = Math.ceil(nameParts.length / 2);
      const name = nameParts.slice(0, halfIndex).join(" ");
      const nameHighlight = nameParts.slice(halfIndex).join(" ");

      return {
        id: p.id,
        name: name || p.name,
        nameHighlight: nameHighlight,
        description:
          p.description ||
          "Premium agricultural equipment designed for maximum efficiency and durability in the field.",
        image:
          p.images && p.images.length > 0
            ? p.images[0]
            : p.imageUrl ||
              "https://images.unsplash.com/photo-1625246333195-bf7913e612fc?q=80&w=2070&auto=format&fit=crop",
        images:
          p.images && p.images.length > 0
            ? p.images
            : p.imageUrl
              ? [p.imageUrl]
              : [
                  "https://images.unsplash.com/photo-1625246333195-bf7913e612fc?q=80&w=2070&auto=format&fit=crop",
                ],
        badge: p.status === "New" ? "New Arrival" : "Premium",
        badgeSecondary: p.category,
        specs: [
          {
            value: `₹${(p.price / 1000).toFixed(0)}`,
            suffix: "K",
            label: "Base Price",
          },
          { value: "Top", suffix: "", label: "Quality Build" },
          { value: "1", suffix: "Yr", label: "Warranty" },
        ],
      };
    });
  }, [products]);

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % sliderProducts.length);
  }, [sliderProducts.length]);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + sliderProducts.length) % sliderProducts.length,
    );
  }, [sliderProducts.length]);

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        goToNext();
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  if (sliderProducts.length === 0) return null;

  const product = sliderProducts[currentIndex];

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: Pause auto-slide on hover
    <section
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a100d 0%, #173b24 45%, #0d1a12 100%)",
      }}
      onMouseEnter={() => {
        isPaused.current = true;
      }}
      onMouseLeave={() => {
        isPaused.current = false;
      }}
    >
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(36,193,89,0.15)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a100d] to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] pointer-events-none mix-blend-overlay" />

      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#14b830] rounded-full blur-sm opacity-50 animate-pulse" />
      <div className="absolute top-3/4 left-1/3 w-3 h-3 bg-[#f4c025] rounded-full blur-sm opacity-40 animate-pulse delay-700" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10 flex-1 flex flex-col justify-center min-h-[600px] lg:min-h-0">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center w-full"
          >
            {/* Left Content */}
            <div className="flex flex-col gap-6 lg:gap-8 text-left lg:col-span-4 z-20">
              {/* Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex flex-wrap gap-3"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A4D2E]/40 border border-[#34653c] text-xs font-bold text-[#4ade80] uppercase tracking-widest shadow-[0_0_15px_rgba(74,222,128,0.1)] backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  {product.badge}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-gray-200 uppercase tracking-widest backdrop-blur-md">
                  {product.badgeSecondary}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black leading-[1.05] tracking-tight text-white uppercase drop-shadow-2xl">
                  {product.name} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4ade80] via-[#14b830] to-[#0ea5e9]">
                    {product.nameHighlight}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 max-w-xl font-medium leading-relaxed drop-shadow-md">
                  {product.description}
                </p>
              </motion.div>

              {/* Specs */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="flex gap-6 sm:gap-10 border-l-4 border-[#14b830] pl-6 bg-gradient-to-r from-white/5 to-transparent py-4 rounded-r-2xl"
              >
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col">
                    <p className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg tracking-tight">
                      {spec.value}
                      <span className="text-[#4ade80] text-xl sm:text-2xl ml-0.5">
                        {spec.suffix}
                      </span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-[0.2em] mt-2 font-bold">
                      {spec.label}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap gap-4 mt-4"
              >
                <a
                  href="https://wa.me/919574245964"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 h-14 md:h-16 px-8 md:px-10 rounded-xl bg-gradient-to-r from-[#14b830] to-[#0f8c24] text-white text-[15px] md:text-base font-bold transition-all shadow-[0_8px_25px_-8px_rgba(20,184,48,0.7)] hover:shadow-[0_12px_35px_-8px_rgba(20,184,48,0.9)] hover:-translate-y-1 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 w-full transform -translate-x-full group-hover:animate-[shimmer_1s_forwards] skew-x-12" />
                  <MessageCircle className="w-5 h-5 group-hover:scale-110 group-hover:rotate-12 transition-all" />
                  Contact on WhatsApp
                </a>
                <Link
                  href={`/products/${product.id}`}
                  className="flex items-center justify-center gap-2 h-14 md:h-16 px-8 rounded-xl bg-white/5 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white text-[15px] md:text-base font-bold transition-all backdrop-blur-md group hover:-translate-y-1 shadow-lg"
                >
                  Explore Product
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform text-[#4ade80]" />
                </Link>
              </motion.div>
            </div>

            {/* Right Content - Product Image */}
            <div className="relative flex justify-center items-center lg:col-span-8 h-[350px] sm:h-[450px] md:h-[600px] lg:h-[800px] group mt-6 sm:mt-10 lg:mt-0 perspective-1000 z-10 w-full ml-auto">
              {/* Dramatic Glow behind the image - Animated for Mobile */}
              <div className="absolute inset-x-0 bottom-0 top-1/4 bg-[#14b830]/25 blur-[60px] sm:blur-[100px] lg:blur-[140px] rounded-full opacity-70 animate-[pulse_4s_ease-in-out_infinite] lg:animate-none scale-100 lg:scale-90 group-hover:scale-100 group-hover:bg-[#14b830]/35 transition-all duration-1000 rotate-180" />
              <div className="absolute inset-y-0 right-0 left-1/4 bg-[#0ea5e9]/15 blur-[50px] sm:blur-[80px] lg:blur-[120px] rounded-full opacity-60 animate-[pulse_5s_ease-in-out_infinite] lg:animate-none scale-95 lg:scale-90 transition-all duration-1000" />

              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{
                  delay: 0.1,
                  duration: 0.9,
                  type: "spring",
                  bounce: 0.4,
                }}
                className="relative z-10 w-full h-full flex justify-center items-center transform-style-3d group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] transition-transform duration-[1.2s] animate-[float_6s_ease-in-out_infinite] lg:animate-none cursor-zoom-in"
                onClick={() => setIsLightboxOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsLightboxOpen(true);
                  }
                }}
                // biome-ignore lint/a11y/useSemanticElements: motion.div needed for Framer Motion 3D transforms
                role="button"
                tabIndex={0}
                aria-label="View product image fullscreen"
              >
                {/* High-impact Image Container with Thin Bezel */}
                <div className="relative w-full max-w-[1050px] aspect-[4/3] lg:aspect-[16/11] rounded-[1rem] sm:rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] lg:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.9)] border border-white/10 lg:border-white/5 group-hover:border-white/10 transition-colors duration-500 bg-[#0a100d]/60 lg:bg-[#0a100d]/50 backdrop-blur-md p-1.5 md:p-2 lg:p-2.5">
                  <div className="relative w-full h-full rounded-[0.75rem] sm:rounded-xl md:rounded-[1.5rem] overflow-hidden bg-white/5 border border-white/5">
                    <Image
                      src={product.image}
                      alt={product.nameHighlight}
                      fill
                      className="object-cover lg:object-contain object-center scale-[1.03] lg:scale-100 group-hover:scale-[1.07] transition-transform duration-[2s] ease-out mix-blend-normal"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
                      priority
                    />

                    {/* Premium gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Hover overlay full-screen hint */}
                  <div className="absolute inset-0 rounded-[0.75rem] sm:rounded-xl md:rounded-[1.5rem] bg-black/0 transition-colors duration-300 group-hover:bg-black/20 z-20 pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 group-hover:opacity-100 z-30 pointer-events-none flex items-center justify-center">
                    <Maximize2 className="h-8 w-8 text-white drop-shadow-md" />
                  </div>

                  {/* Glass reflection effect - Animated for mobile */}
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden pointer-events-none">
                    <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rotate-45 bg-gradient-to-b from-white/10 to-transparent opacity-15 lg:opacity-0 animate-[shimmer_8s_infinite] lg:animate-none lg:group-hover:opacity-20 transition-opacity duration-1000 -translate-y-[10%] lg:translate-y-[-20%] lg:group-hover:translate-y-[20%]" />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modern Slider Controls */}
        <div className="absolute bottom-8 lg:bottom-12 left-0 right-0 flex justify-center items-center gap-6 z-30 px-6 mt-8">
          <button
            type="button"
            onClick={goToPrev}
            className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group/btn"
            aria-label="Previous product"
          >
            <ChevronLeft className="w-6 h-6 group-hover/btn:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex gap-4 items-center bg-black/40 backdrop-blur-xl px-6 py-4 rounded-full border border-white/5">
            {sliderProducts.map((p, i) => (
              <button
                type="button"
                key={p.id}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className="relative flex items-center justify-center p-2 -m-2 group/dot"
                aria-label={`Go to product ${i + 1}`}
              >
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                    i === currentIndex
                      ? "w-10 bg-[#4ade80] shadow-[0_0_12px_rgba(74,222,128,0.8)]"
                      : "w-2 bg-white/30 group-hover/dot:bg-white/60 group-hover/dot:w-4"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="w-12 h-12 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group/btn"
            aria-label="Next product"
          >
            <ChevronRight className="w-6 h-6 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <ImageLightbox
          isOpen={isLightboxOpen}
          onClose={() => setIsLightboxOpen(false)}
          images={product.images || [product.image]}
          currentIndex={0}
        />
      )}
    </section>
  );
}
