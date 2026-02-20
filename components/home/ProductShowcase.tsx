"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const products = [
    {
        id: "hydraulic-trolley",
        name: "Hydraulic Trolley",
        category: "Trolleys",
        description:
            "Heavy-duty hydraulic tipping trolley built for maximum load capacity and effortless unloading.",
        image:
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2069&auto=format&fit=crop",
        badge: "Bestseller",
    },
    {
        id: "9-tyne-cultivator",
        name: "9-Tyne Cultivator",
        category: "Cultivators",
        description:
            "Precision-engineered cultivator with 9 spring-loaded tynes for superior soil preparation.",
        image:
            "https://images.unsplash.com/photo-1592860956971-555f653a63e7?q=80&w=2070&auto=format&fit=crop",
        badge: "New Arrival",
    },
    {
        id: "heavy-duty-rotavator",
        name: "Heavy Duty Rotavator",
        category: "Rotavators",
        description:
            "Commercial-grade rotavator with reinforced blades for deep tillage across all soil types.",
        image:
            "https://images.unsplash.com/photo-1595181775791-7667ff46949b?q=80&w=2070&auto=format&fit=crop",
        badge: "Popular",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function ProductShowcase() {
    return (
        <section id="products" className="py-20 md:py-28 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6">
                {/* Section Header */}
                <div className="mb-14 space-y-4">
                    <p className="text-primary font-semibold uppercase tracking-widest text-sm">
                        Our Equipment
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
                            Featured Machinery
                        </h2>
                        <Button
                            asChild
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white font-semibold gap-2 self-start md:self-auto"
                        >
                            <Link href="/products">
                                View All Products
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Discover our most popular agricultural equipment, trusted by
                        thousands of farmers across India.
                    </p>
                </div>

                {/* Product Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {products.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-xl transition-all duration-500 bg-white">
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <Badge className="absolute top-4 left-4 bg-primary text-white font-semibold">
                                        {product.badge}
                                    </Badge>
                                </div>
                                <CardContent className="p-6 space-y-3">
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                                        {product.category}
                                    </p>
                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {product.description}
                                    </p>
                                    <div className="pt-3">
                                        <Button
                                            asChild
                                            variant="ghost"
                                            className="px-0 text-primary font-semibold hover:bg-transparent hover:text-primary/80 gap-2 group/btn"
                                        >
                                            <Link href={`/products/${product.id}`}>
                                                View Details
                                                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
