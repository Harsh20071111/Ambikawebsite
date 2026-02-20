"use client";

import { motion } from "framer-motion";
import { Shield, Award, Headphones, Wrench } from "lucide-react";

const values = [
    {
        icon: Shield,
        title: "Durability & Build",
        description:
            "Built with high-grade steel and premium materials to withstand the toughest farming conditions year after year.",
    },
    {
        icon: Award,
        title: "ISO Certified Quality",
        description:
            "Every product meets rigorous international quality standards, ensuring reliability and consistent performance.",
    },
    {
        icon: Headphones,
        title: "24/7 Customer Support",
        description:
            "Round-the-clock technical support and a nationwide dealer network to keep your operations running smoothly.",
    },
    {
        icon: Wrench,
        title: "Easy Maintenance",
        description:
            "Designed with farmer-friendly maintenance in mind. Readily available spare parts across India.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function BrandValues() {
    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <p className="text-primary font-semibold uppercase tracking-widest text-sm">
                        Why Choose Us
                    </p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                        Built for the Farmer,
                        <br />
                        <span className="text-primary">Engineered for the Future</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We combine decades of agricultural expertise with modern engineering
                        to deliver equipment that makes a real difference.
                    </p>
                </div>

                {/* Value Cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative bg-muted/40 hover:bg-primary rounded-xl p-8 transition-all duration-500 cursor-default overflow-hidden"
                        >
                            {/* Decorative circle */}
                            <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/5 group-hover:bg-white/10 rounded-full transition-colors duration-500" />

                            <div className="relative space-y-4">
                                <div className="w-14 h-14 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors duration-500">
                                    <value.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-500" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground group-hover:text-white transition-colors duration-500">
                                    {value.title}
                                </h3>
                                <p className="text-muted-foreground group-hover:text-white/80 text-sm leading-relaxed transition-colors duration-500">
                                    {value.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
