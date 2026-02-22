"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";

type ComponentProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  status: string;
  imageUrl: string | null;
};

export function QuickProductStrip({
  products = [],
}: {
  products?: ComponentProduct[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    // Add a small buffer of 5px for floating point issues
    setCanScrollRight(
      Math.ceil(el.scrollLeft) < el.scrollWidth - el.clientWidth - 5,
    );
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    // Also check on resize
    window.addEventListener("resize", checkScroll, { passive: true });

    // Initial check after items might have rendered
    setTimeout(checkScroll, 100);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    // Scroll by roughly one card width + gap
    const scrollAmount = window.innerWidth < 640 ? 300 : 340;
    el.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-[#fcfbf8] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#f5f1e6]/50 to-transparent pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-6">
            <div className="max-w-xl">
              <h2 className="text-[#1c180d] text-3xl md:text-4xl lg:text-[42px] font-bold leading-[1.1] tracking-[-0.02em] mb-4">
                Our Products
              </h2>
              <p className="text-[#6b6657] text-lg font-medium leading-relaxed max-w-md">
                Discover our range of premium equipment built for precision and
                endurance.
              </p>
            </div>

            <div className="flex gap-3 self-start md:self-end">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className="h-12 w-12 rounded-full border border-[#e8e2ce] bg-white flex items-center justify-center hover:bg-[#1c180d] hover:border-[#1c180d] hover:text-white text-[#1c180d] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-[#e8e2ce] disabled:hover:text-[#1c180d]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2]" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className="h-12 w-12 rounded-full border border-[#e8e2ce] bg-white flex items-center justify-center hover:bg-[#1c180d] hover:border-[#1c180d] hover:text-white text-[#1c180d] transition-all duration-300 disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-[#e8e2ce] disabled:hover:text-[#1c180d]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Horizontal scroll container with mask for elegant fade-out on right */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 sm:gap-8 pb-10 pt-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="flex-none w-[280px] sm:w-[320px] snap-start group"
              >
                <Link href={`/products/${product.id}`} className="block h-full">
                  <div className="bg-white rounded-2xl overflow-hidden border border-[#e8e2ce]/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-[#e8e2ce] transition-all duration-500 h-full flex flex-col group-hover:-translate-y-2">
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] bg-[#f5f3ec] overflow-hidden p-6 flex items-center justify-center">
                      {product.imageUrl ? (
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain p-6 transition-transform duration-700 ease-in-out group-hover:scale-105"
                          sizes="(max-width: 640px) 280px, 320px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-20">
                          <Image
                            src="/logo.svg"
                            alt="placeholder"
                            width={60}
                            height={60}
                          />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                        {product.status === "New" && (
                          <span className="bg-[#1c180d] text-white text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-full shadow-sm">
                            New Release
                          </span>
                        )}
                        <span className="bg-white/90 backdrop-blur-sm text-[#1c180d] text-[10px] uppercase font-bold tracking-wider py-1.5 px-3 rounded-full shadow-sm border border-black/5">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 sm:p-7 flex flex-col flex-1 bg-white relative">
                      {/* Price tag positioned overlapping the image section slightly */}
                      <div className="absolute -top-5 right-6 bg-[#f4c025] text-[#1c180d] text-[13px] font-bold px-4 py-2 rounded-lg shadow-md transform transition-transform duration-300 group-hover:-translate-y-1">
                        ₹{product.price.toLocaleString("en-IN")}
                      </div>

                      <h3 className="text-[#1c180d] text-[22px] font-bold mb-2 leading-tight group-hover:text-[#dca510] transition-colors duration-300">
                        {product.name}
                      </h3>

                      <p className="text-[#6b6657] text-[15px] leading-relaxed line-clamp-2 mt-2 mb-6 flex-1">
                        {product.description ||
                          "Premium agricultural equipment designed for maximum efficiency and durability in the field."}
                      </p>

                      <div className="mt-auto pt-5 border-t border-[#f5f1e6] flex items-center justify-between">
                        <span className="text-[#1c180d] font-bold text-[14px] tracking-wide">
                          Explore Product
                        </span>
                        <div className="w-8 h-8 rounded-full bg-[#f5f1e6] flex items-center justify-center group-hover:bg-[#1c180d] group-hover:text-white transition-colors duration-300">
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
