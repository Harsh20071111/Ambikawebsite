"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type GalleryImage = {
    src: string;
    productName: string;
    category: string;
};

// Assign varied grid spans for visual interest
const spanPatterns = [
    "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
];

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
    const [activeTab, setActiveTab] = useState("all");
    const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

    // Build category tabs from actual product categories
    const categories = Array.from(new Set(images.map((img) => img.category)));
    const tabs = [
        { value: "all", label: "All Products" },
        ...categories.map((cat) => ({ value: cat, label: cat })),
    ];

    const filteredImages =
        activeTab === "all"
            ? images
            : images.filter((img) => img.category === activeTab);

    // Lightbox navigation
    const closeLightbox = useCallback(() => setLightboxIdx(null), []);
    const goNext = useCallback(() => {
        if (lightboxIdx !== null) {
            setLightboxIdx((prev) =>
                prev !== null ? (prev + 1) % filteredImages.length : null,
            );
        }
    }, [lightboxIdx, filteredImages.length]);
    const goPrev = useCallback(() => {
        if (lightboxIdx !== null) {
            setLightboxIdx((prev) =>
                prev !== null
                    ? (prev - 1 + filteredImages.length) % filteredImages.length
                    : null,
            );
        }
    }, [lightboxIdx, filteredImages.length]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (lightboxIdx === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [lightboxIdx, closeLightbox, goNext, goPrev]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (lightboxIdx !== null) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxIdx]);

    return (
        <>
            {/* Header */}
            <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-72 h-72 border border-white/20 rounded-full" />
                    <div className="absolute -bottom-10 -left-10 w-56 h-56 border border-white/15 rounded-full" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-2xl"
                    >
                        <p className="text-white/60 font-semibold uppercase tracking-widest text-sm mb-3">
                            Product Gallery
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
                            Our <span className="text-[#D4A843]">Products</span>
                        </h1>
                        <p className="text-white/70 text-lg">
                            Browse through all our product images — every angle, every detail.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-12 md:py-16">
                <div className="container mx-auto px-4 md:px-6">
                    {/* Filter Tabs */}
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="mb-10"
                    >
                        <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
                                >
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    {/* Empty state */}
                    {filteredImages.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-muted-foreground text-lg">
                                No product images found. Upload images in the admin panel.
                            </p>
                        </div>
                    )}

                    {/* Grid */}
                    <motion.div
                        layout
                        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredImages.map((item, idx) => (
                                <motion.div
                                    key={`${item.src}-${idx}`}
                                    layout
                                    initial={{
                                        opacity: 0,
                                        x: idx % 2 === 0 ? -30 : 30,
                                        scale: 0.95,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                    }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    viewport={{ once: true, margin: "-60px" }}
                                    transition={{
                                        duration: 0.5,
                                        delay: (idx % 4) * 0.08,
                                        ease: [0.25, 0.46, 0.45, 0.94],
                                    }}
                                    className={`relative rounded-xl overflow-hidden group cursor-pointer ${spanPatterns[idx % spanPatterns.length]}`}
                                    onClick={() => setLightboxIdx(idx)}
                                >
                                    <Image
                                        src={item.src}
                                        alt={`${item.productName} product image`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-white text-sm font-semibold">
                                            {item.productName}
                                        </p>
                                        <p className="text-white/70 text-xs">{item.category}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIdx !== null && filteredImages[lightboxIdx] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                        onClick={closeLightbox}
                    >
                        {/* Close */}
                        <button
                            type="button"
                            className="absolute top-6 right-6 text-white/70 hover:text-white z-50 cursor-pointer"
                            onClick={closeLightbox}
                            aria-label="Close lightbox"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        {/* Prev */}
                        <button
                            type="button"
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl md:text-5xl z-50 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                goPrev();
                            }}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>

                        {/* Image */}
                        <motion.div
                            key={lightboxIdx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-[90vw] h-[80vh] max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={filteredImages[lightboxIdx].src}
                                alt={filteredImages[lightboxIdx].productName}
                                fill
                                className="object-contain"
                                sizes="90vw"
                                priority
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                                <p className="text-white font-semibold text-lg">
                                    {filteredImages[lightboxIdx].productName}
                                </p>
                                <p className="text-white/60 text-sm">
                                    {filteredImages[lightboxIdx].category}
                                </p>
                            </div>
                        </motion.div>

                        {/* Next */}
                        <button
                            type="button"
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white text-4xl md:text-5xl z-50 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                goNext();
                            }}
                            aria-label="Next image"
                        >
                            ›
                        </button>

                        {/* Counter */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm">
                            {lightboxIdx + 1} / {filteredImages.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA */}
            <section className="py-16 bg-muted/30 border-t border-border">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
                        See something you like?
                    </h3>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
                        Get in touch with our team to learn more about any of our equipment
                        or find a dealer near you.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            className="bg-primary text-white hover:bg-primary/90 font-bold px-8 h-12 gap-2"
                        >
                            <Link href="/contact">
                                <MapPin className="w-4 h-4" />
                                Find a Dealer
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 h-12 gap-2"
                        >
                            <a
                                href="https://wa.me/919574245964"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp for Details
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}
