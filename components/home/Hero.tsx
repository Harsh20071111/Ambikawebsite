"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import Link from "next/link";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    return (
        <section ref={ref} className="relative min-h-[92vh] w-full overflow-hidden">
            {/* Background Image with Parallax */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1625246333195-bf7913e612fc?q=80&w=2070&auto=format&fit=crop')",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B]/95 via-[#064E3B]/70 to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 h-full flex items-center min-h-[92vh]">
                <motion.div
                    style={{ opacity }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2 }}
                    className="max-w-2xl space-y-8"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full border border-white/20">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            Trusted by 5000+ Indian Farmers
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight"
                    >
                        Reliable Agricultural{" "}
                        <span className="text-[#D4A843]">Equipment</span> for Modern Farming
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed"
                    >
                        Premium quality agricultural machinery built for Indian farming
                        conditions. Engineered for durability, designed for performance.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex flex-col sm:flex-row gap-4 pt-2"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-primary hover:bg-white/90 font-bold text-base px-8 h-13 rounded-lg gap-2 shadow-xl shadow-black/20"
                        >
                            <Link href="/products">
                                View Products
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="bg-transparent border-2 border-white/40 text-white hover:bg-white/10 font-bold text-base px-8 h-13 rounded-lg gap-2"
                        >
                            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="w-4 h-4" />
                                WhatsApp Inquiry
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
        </section>
    );
}
