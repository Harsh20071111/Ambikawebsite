"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ArrowLeft,
    CheckCircle2,
    MessageCircle,
    Phone,
    ChevronRight,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, use } from "react";

// Static product data
const allProducts: Record<
    string,
    {
        name: string;
        category: string;
        description: string;
        badge: string;
        images: string[];
        specs: { label: string; value: string }[];
        features: string[];
    }
> = {
    "hydraulic-trolley": {
        name: "Heavy Duty Tractor Trolley",
        category: "Trolleys",
        description:
            "Our flagship hydraulic tipping trolley is designed for heavy-duty farm transport. With a robust steel frame and high-capacity hydraulic system, it handles loads up to 10 tons with ease. Ideal for transporting sugarcane, grains, sand, and more.",
        badge: "Bestseller",
        images: [
            "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2069&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2668&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1530507629858-e49769a7d975?q=80&w=2670&auto=format&fit=crop",
        ],
        specs: [
            { label: "Capacity", value: "8-10 Tons" },
            { label: "Flooring", value: "4mm MS Sheet" },
            { label: "Tyre Size", value: "7.50 x 16 (8 Ply)" },
            { label: "Axle", value: "Heavy Duty 65mm" },
            { label: "Hydraulic Ram", value: "4-Stage, 125mm Bore" },
            { label: "Length x Width", value: "12ft x 6ft" },
            { label: "Side Height", value: "2ft (Extendable)" },
            { label: "Jack Type", value: "Hydraulic" },
        ],
        features: [
            "High-tensile steel frame construction",
            "4-stage hydraulic tipping mechanism",
            "Anti-corrosion powder-coated finish",
            "Heavy-duty leaf springs for smooth ride",
            "Universal hitch compatible with all tractors",
            "LED tail lights & reflectors for road safety",
            "Grease points for easy maintenance",
            "2-year warranty on frame and hydraulics",
        ],
    },
    "9-tyne-cultivator": {
        name: "9-Tyne Spring Cultivator",
        category: "Cultivators",
        description:
            "Precision-engineered cultivator with 9 heavy-duty spring-loaded tynes. Perfect for secondary tillage, seedbed preparation, and inter-row cultivation across diverse soil conditions.",
        badge: "New Arrival",
        images: [
            "https://images.unsplash.com/photo-1592860956971-555f653a63e7?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1517424683050-8b02c8172945?q=80&w=1974&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1605000797499-95a05b376481?q=80&w=2072&auto=format&fit=crop",
        ],
        specs: [
            { label: "Number of Tynes", value: "9" },
            { label: "Working Width", value: "7ft" },
            { label: "Working Depth", value: "6-9 inches" },
            { label: "Frame", value: "Heavy Duty Box Section" },
            { label: "Tyne Type", value: "Spring Loaded" },
            { label: "Hitch", value: "3-Point Category II" },
            { label: "HP Required", value: "35-55 HP" },
            { label: "Weight", value: "280 kg" },
        ],
        features: [
            "Spring-loaded tynes for stone protection",
            "Adjustable depth control wheels",
            "High-carbon steel shovels",
            "Heavy-duty box section frame",
            "Suitable for all soil types",
            "Easy tyne replacement design",
            "Category II 3-point linkage",
            "1-year comprehensive warranty",
        ],
    },
    "heavy-duty-rotavator": {
        name: "Commercial Grade Rotavator",
        category: "Rotavators",
        description:
            "Our commercial-grade rotavator features reinforced L-shaped blades for deep, thorough soil preparation. Designed for high-HP tractors, it delivers exceptional performance in both wet and dry conditions.",
        badge: "Popular",
        images: [
            "https://images.unsplash.com/photo-1595181775791-7667ff46949b?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1535242208474-9a2793260ca8?q=80&w=1964&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2670&auto=format&fit=crop",
        ],
        specs: [
            { label: "Working Width", value: "5ft / 6ft / 7ft" },
            { label: "Number of Blades", value: "42 / 48 / 54" },
            { label: "Blade Type", value: "L-Type Forged" },
            { label: "Gearbox", value: "Heavy Duty 6-Gear" },
            { label: "HP Required", value: "45-75 HP" },
            { label: "Depth", value: "Up to 9 inches" },
            { label: "PTO Speed", value: "540 RPM" },
            { label: "Weight", value: "380-520 kg" },
        ],
        features: [
            "Forged L-type blades for maximum durability",
            "Heavy-duty 6-gear transmission gearbox",
            "Side-gear drive for smooth operation",
            "Adjustable rear leveling bar",
            "Heavy-duty side plates",
            "Anti-wrap chain guard",
            "Suitable for paddy, wheat, and sugarcane",
            "2-year warranty on gearbox",
        ],
    },
};

// Fallback product
const fallbackProduct = {
    name: "Agricultural Equipment",
    category: "General",
    description: "High-quality agricultural equipment built for Indian farming conditions.",
    badge: "",
    images: [
        "https://images.unsplash.com/photo-1625246333195-bf7913e612fc?q=80&w=2070&auto=format&fit=crop",
    ],
    specs: [
        { label: "Type", value: "Agricultural Equipment" },
        { label: "Build", value: "Heavy Duty" },
        { label: "Origin", value: "Made in India" },
    ],
    features: [
        "Premium build quality",
        "Designed for Indian conditions",
        "Easy maintenance",
        "Warranty included",
    ],
};

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = allProducts[id] || fallbackProduct;
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="min-h-screen bg-background pt-20">
            {/* Breadcrumb */}
            <div className="bg-muted/40 border-b border-border">
                <div className="container mx-auto px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-primary transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/products" className="hover:text-primary transition-colors">
                            Products
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium">{product.name}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left - Image Gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        {/* Main Image */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.badge && (
                                <Badge className="absolute top-4 left-4 bg-primary text-white font-semibold text-sm px-4 py-1">
                                    {product.badge}
                                </Badge>
                            )}
                        </div>
                        {/* Thumbnails */}
                        <div className="flex gap-3">
                            {product.images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${selectedImage === i
                                        ? "ring-2 ring-primary ring-offset-2"
                                        : "opacity-60 hover:opacity-100"
                                        }`}
                                >
                                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="space-y-8"
                    >
                        <div className="space-y-3">
                            <p className="text-primary font-semibold uppercase tracking-widest text-sm">
                                {product.category}
                            </p>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                asChild
                                className="bg-primary hover:bg-primary/90 text-white font-bold h-13 px-8 gap-2 rounded-lg"
                            >
                                <a
                                    href="https://wa.me/919876543210"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Inquire on WhatsApp
                                </a>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                className="border-primary text-primary hover:bg-primary hover:text-white font-bold h-13 px-8 gap-2 rounded-lg"
                            >
                                <a href="tel:+919876543210">
                                    <Phone className="w-4 h-4" />
                                    Call for Quote
                                </a>
                            </Button>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-bold text-foreground">Key Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {product.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-sm text-foreground/80">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tech Specs Table */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16"
                >
                    <h2 className="text-2xl font-extrabold text-foreground mb-6">
                        Technical Specifications
                    </h2>
                    <Card className="overflow-hidden border border-border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-primary/5">
                                    <TableHead className="font-bold text-foreground w-1/3">
                                        Specification
                                    </TableHead>
                                    <TableHead className="font-bold text-foreground">
                                        Details
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {product.specs.map((spec, i) => (
                                    <TableRow key={i} className="hover:bg-muted/30">
                                        <TableCell className="font-medium text-foreground/80">
                                            {spec.label}
                                        </TableCell>
                                        <TableCell className="text-foreground">{spec.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                </motion.div>

                {/* Back + Related */}
                <div className="mt-12 flex items-center justify-between">
                    <Button asChild variant="ghost" className="text-primary font-semibold gap-2">
                        <Link href="/products">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Products
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold gap-2">
                        <Link href="/contact">
                            Get a Custom Quote
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
