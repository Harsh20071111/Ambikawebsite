"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

const stripProducts = [
    {
        id: "rotavator-x",
        name: "Rotavator Series X",
        sub: "Starting from ₹95,000",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2069&auto=format&fit=crop",
        badge: "NEW",
        badgeColor: "bg-[#f4c025] text-[#1c180d]",
    },
    {
        id: "heavy-cultivator",
        name: "Heavy Duty Cultivator",
        sub: "9 & 11 Tine Options",
        image: "https://images.unsplash.com/photo-1592860956971-555f653a63e7?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "hydraulic-plough",
        name: "Hydraulic Reversible Plough",
        sub: "2 & 3 Bottom",
        image: "https://images.unsplash.com/photo-1595181775791-7667ff46949b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: "seed-drill",
        name: "Multi-Crop Seed Drill",
        sub: "High Precision Sowing",
        image: "https://images.unsplash.com/photo-1605000797499-95a05b376481?q=80&w=2072&auto=format&fit=crop",
        badge: "BESTSELLER",
        badgeColor: "bg-gray-800 text-white",
    },
    {
        id: "land-leveler",
        name: "Laser Land Leveler",
        sub: "Advanced Precision",
        image: "https://images.unsplash.com/photo-1625246333195-bf7913e612fc?q=80&w=2070&auto=format&fit=crop",
    },
];

export function QuickProductStrip() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", checkScroll);
        checkScroll();
        return () => el.removeEventListener("scroll", checkScroll);
    }, []);

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
    };

    return (
        <section className="py-12 bg-[#fcfbf8] border-b border-[#e8e2ce]">
            <div className="max-w-7xl mx-auto px-4 lg:px-10">
                <AnimatedSection>
                    <div className="flex items-center justify-between mb-8 px-2">
                        <h2 className="text-[#1c180d] text-2xl lg:text-[28px] font-bold leading-tight tracking-[-0.015em] flex items-center gap-3">
                            <span className="w-2 h-8 bg-[#f4c025] rounded-sm" />
                            Our Machinery Range
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                                className="h-10 w-10 rounded-full border border-[#e8e2ce] bg-white flex items-center justify-center hover:bg-gray-50 text-[#1c180d] transition-colors shadow-sm disabled:opacity-30"
                                aria-label="Scroll left"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                                className="h-10 w-10 rounded-full border border-[#e8e2ce] bg-white flex items-center justify-center hover:bg-gray-50 text-[#1c180d] transition-colors shadow-sm disabled:opacity-30"
                                aria-label="Scroll right"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Horizontal scroll container */}
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {stripProducts.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="flex-none w-[280px] snap-center group"
                        >
                            <div className="bg-white rounded-xl overflow-hidden border border-[#e8e2ce] shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {product.badge && (
                                        <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded ${product.badgeColor}`}>
                                            {product.badge}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-[#1c180d] text-lg font-bold mb-1">{product.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{product.sub}</p>
                                    <div className="mt-auto pt-4 border-t border-dashed border-gray-200">
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="text-[#dca510] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                                        >
                                            View Specs
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
