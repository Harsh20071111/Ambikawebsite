"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Fallback products used if no database products are available
const fallbackProducts = [
    {
        id: "hydraulic-trolley",
        name: "HYDRAULIC",
        nameHighlight: "TROLLEY V-2",
        description: "Built for rough terrain. Engineered for maximum load capacity and rugged Indian farming conditions.",
        image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2069&auto=format&fit=crop",
        badge: "New Arrival 2024",
        badgeSecondary: "Heavy Duty Series",
        specs: [
            { value: "10", suffix: "+", label: "Ton Capacity" },
            { value: "Dual", suffix: "", label: "Axle System" },
            { value: "45", suffix: "°", label: "Tilt Angle" },
        ],
    },
    {
        id: "9-tyne-cultivator",
        name: "HEAVY DUTY",
        nameHighlight: "CULTIVATOR 9T",
        description: "Precision-engineered cultivator with 9 spring-loaded tynes for superior soil preparation across all terrain.",
        image: "https://images.unsplash.com/photo-1592860956971-555f653a63e7?q=80&w=2070&auto=format&fit=crop",
        badge: "Best Seller",
        badgeSecondary: "Tillage Series",
        specs: [
            { value: "9", suffix: "", label: "Spring Tynes" },
            { value: "35", suffix: "+", label: "HP Required" },
            { value: "7ft", suffix: "", label: "Working Width" },
        ],
    },
    {
        id: "heavy-duty-rotavator",
        name: "PRECISION",
        nameHighlight: "ROTAVATOR X7",
        description: "Commercial-grade rotavator with reinforced blades for deep tillage. Designed for the toughest Indian soil.",
        image: "https://images.unsplash.com/photo-1595181775791-7667ff46949b?q=80&w=2070&auto=format&fit=crop",
        badge: "Popular Choice",
        badgeSecondary: "Power Series",
        specs: [
            { value: "48", suffix: "", label: "Forged Blades" },
            { value: "6ft", suffix: "", label: "Working Width" },
            { value: "45", suffix: "+", label: "HP Required" },
        ],
    },
];

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
    }),
};

export function ProductSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const products = fallbackProducts;

    const goToNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % products.length);
    }, [products.length]);

    const goToPrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    }, [products.length]);

    // Auto-slide
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(goToNext, 5000);
        return () => clearInterval(interval);
    }, [isPaused, goToNext]);

    const product = products[currentIndex];

    return (
        <section
            className="relative min-h-screen flex items-center pt-20 overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0D1610 0%, #1A4D2E 45%, #152618 100%)",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(circle_at_center,rgba(26,77,46,0.3)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0D1610] to-transparent pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.04] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-12 lg:py-0">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Left Content */}
                        <div className="flex flex-col gap-8 text-left">
                            {/* Badges */}
                            <div className="flex flex-wrap gap-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A4D2E]/50 border border-[#34653c] text-xs font-medium text-[#14b830] uppercase tracking-wider backdrop-blur-sm">
                                    <span className="w-1.5 h-1.5 bg-[#14b830] rounded-full animate-pulse" />
                                    {product.badge}
                                </span>
                                <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 uppercase tracking-wider backdrop-blur-sm">
                                    {product.badgeSecondary}
                                </span>
                            </div>

                            {/* Headline */}
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white">
                                    {product.name} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b830] to-emerald-300">
                                        {product.nameHighlight}
                                    </span>
                                </h1>
                                <p className="text-lg md:text-xl text-gray-400 max-w-lg font-light leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Specs */}
                            <div className="flex gap-8 border-l-2 border-[#1A4D2E] pl-6">
                                {product.specs.map((spec, i) => (
                                    <div key={i}>
                                        <p className="text-3xl font-extrabold text-white">
                                            {spec.value}
                                            <span className="text-[#14b830] text-xl">{spec.suffix}</span>
                                        </p>
                                        <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">{spec.label}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mt-2">
                                <a
                                    href="https://wa.me/919876543210"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-[#14b830] hover:bg-[#0f8c24] text-white font-bold transition-all shadow-[0_0_20px_rgba(20,184,48,0.4)] hover:shadow-[0_0_30px_rgba(20,184,48,0.6)] group"
                                >
                                    <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Contact on WhatsApp
                                </a>
                                <Link
                                    href={`/products/${product.id}`}
                                    className="flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all backdrop-blur-sm group"
                                >
                                    View Specs
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gray-400" />
                                </Link>
                            </div>
                        </div>

                        {/* Right Content - Product Image */}
                        <div className="relative flex justify-center items-center lg:h-[600px] group">
                            <div className="absolute inset-0 bg-[#14b830]/20 blur-[100px] rounded-full opacity-60 scale-75 group-hover:scale-90 transition-transform duration-700" />
                            <div className="relative z-10 w-full transform transition-all duration-700 hover:scale-105 hover:-rotate-1">
                                <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px]">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover rounded-2xl"
                                        style={{
                                            maskImage: "linear-gradient(to bottom, black 80%, transparent 100%)",
                                            WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                                        }}
                                        priority
                                    />
                                </div>
                                {/* Interactive Hotspots */}
                                <div className="absolute top-1/3 left-1/4 group/spot hidden lg:block">
                                    <div className="w-4 h-4 bg-[#14b830] rounded-full animate-ping absolute" />
                                    <div className="w-4 h-4 bg-white rounded-full relative border-2 border-[#14b830] cursor-pointer hover:scale-125 transition-transform" />
                                </div>
                                <div className="absolute bottom-1/4 right-1/4 group/spot hidden lg:block">
                                    <div className="w-4 h-4 bg-[#14b830] rounded-full animate-ping absolute delay-300" />
                                    <div className="w-4 h-4 bg-white rounded-full relative border-2 border-[#14b830] cursor-pointer hover:scale-125 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Slider Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20">
                    <button
                        onClick={goToPrev}
                        className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        aria-label="Previous product"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex gap-3">
                        {products.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => {
                                    setDirection(i > currentIndex ? 1 : -1);
                                    setCurrentIndex(i);
                                }}
                                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex
                                        ? "w-12 bg-[#14b830] shadow-[0_0_10px_rgba(20,184,48,0.5)]"
                                        : "w-3 bg-white/20 hover:bg-white/40 cursor-pointer"
                                    }`}
                                aria-label={`Go to product ${i + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={goToNext}
                        className="w-12 h-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                        aria-label="Next product"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
}
