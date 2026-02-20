"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
    Quote,
    Cog,
    ShieldCheck,
    Microscope,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const aboutStats = [
    { label: "Machines Delivered", value: 5300, suffix: "+" },
    { label: "Years of Excellence", value: 15, suffix: "+" },
    { label: "Dealer Network", value: 350, suffix: "+" },
    { label: "Made in India", value: 100, suffix: "%" },
];

const manufacturing = [
    {
        icon: Cog,
        title: "Precision Welding",
        description:
            "Advanced robotic and manual welding ensures structural integrity that withstands years of heavy use.",
        image:
            "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    },
    {
        icon: ShieldCheck,
        title: "Assembly & Testing",
        description:
            "Every machine goes through a multi-point assembly process followed by rigorous performance tests.",
        image:
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
    },
    {
        icon: Microscope,
        title: "Quality Control",
        description:
            "ISO-certified quality control across raw materials, components, and finished products.",
        image:
            "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    },
];

const timeline = [
    {
        year: "1995",
        title: "Founded in Ludhiana",
        description:
            "Started as a small workshop with a vision to build reliable farm equipment for Indian farmers.",
    },
    {
        year: "2003",
        title: "First 1000 Machines",
        description:
            "Crossed the milestone of 1000 machines sold, establishing a loyal customer base across Punjab.",
    },
    {
        year: "2010",
        title: "ISO Certification",
        description:
            "Achieved ISO 9001:2008 certification, setting new standards for quality in agricultural manufacturing.",
    },
    {
        year: "2015",
        title: "Modernized Factory",
        description:
            "Invested in CNC machines, robotic welding, and automated paint lines to scale production.",
    },
    {
        year: "2020",
        title: "Pan-India Expansion",
        description:
            "Expanded dealer network to 350+ dealers across 20+ states, becoming a nationally recognized brand.",
    },
];

const team = [
    {
        name: "Harpreet Singh",
        role: "Founder & CEO",
        image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop",
    },
    {
        name: "Dr. Arun Patel",
        role: "Head of R&D",
        image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1170&auto=format&fit=crop",
    },
    {
        name: "Priya Sharma",
        role: "Operations Head",
        image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop",
    },
];

export default function AboutPage() {
    const statsRef = useRef(null);
    const statsInView = useInView(statsRef, { once: true, margin: "-100px" });

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative py-24 md:py-36 overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2670&auto=format&fit=crop"
                        alt="Golden harvest field"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#064E3B]/95 via-[#064E3B]/80 to-[#064E3B]/60" />
                </div>
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <p className="text-white/60 font-semibold uppercase tracking-widest text-sm mb-4">
                            Our Story
                        </p>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                            Empowering Indian{" "}
                            <span className="text-[#D4A843]">Agriculture.</span>
                        </h1>
                        <p className="text-white/70 text-lg leading-relaxed">
                            From a small workshop in Ludhiana to a nationally trusted brand —
                            our journey is built on a commitment to quality, innovation, and
                            the Indian farmer.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats */}
            <section ref={statsRef} className="py-10 bg-primary">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {aboutStats.map((stat, i) => (
                            <div key={i} className="text-center py-4">
                                <div className="text-3xl md:text-5xl font-extrabold text-white mb-1">
                                    {statsInView ? (
                                        <CountUp
                                            end={stat.value}
                                            duration={2.5}
                                            separator=","
                                            suffix={stat.suffix}
                                        />
                                    ) : (
                                        <span>0{stat.suffix}</span>
                                    )}
                                </div>
                                <p className="text-white/60 text-sm font-medium uppercase tracking-wider">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Quote */}
            <section className="py-20 md:py-28 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-8">
                            <Quote className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
                            Our Mission
                        </p>
                        <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-snug">
                            &ldquo;To provide Indian farmers with robust, affordable, and
                            world-class machinery that enhances productivity every season,
                            ensuring every harvest is{" "}
                            <span className="text-primary">better than the last.</span>&rdquo;
                        </blockquote>
                    </motion.div>
                </div>
            </section>

            {/* Manufacturing Excellence */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mb-14">
                        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
                            How We Build
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
                            Manufacturing Excellence
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {manufacturing.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <Card className="overflow-hidden border-0 shadow-sm hover:shadow-lg transition-shadow group">
                                    <div className="relative h-56 overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                        <div className="absolute bottom-4 left-4 z-10">
                                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                                                <item.icon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-6 space-y-2">
                                        <p className="text-sm text-muted-foreground">
                                            Interested in partnering with AMBIKA ENGINEERING? Join our dealer
                                            network.
                                        </p>    <p className="text-muted-foreground text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-20 md:py-28 bg-muted/30">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-14">
                        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
                            Milestones
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
                            Our Journey
                        </h2>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex gap-6 mb-10 last:mb-0"
                            >
                                {/* Year */}
                                <div className="flex flex-col items-center">
                                    <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-extrabold text-sm shrink-0">
                                        {item.year}
                                    </div>
                                    {i < timeline.length - 1 && (
                                        <div className="w-0.5 h-full bg-primary/20 mt-2" />
                                    )}
                                </div>
                                {/* Content */}
                                <div className="pb-8">
                                    <h3 className="text-lg font-bold text-foreground mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20 md:py-28 bg-white">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-14">
                        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
                            Leadership
                        </p>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
                            The Experts Behind The Machines
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {team.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="relative w-40 h-40 mx-auto mb-5 rounded-2xl overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-foreground">
                                    {member.name}
                                </h3>
                                <p className="text-primary text-sm font-medium">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-primary">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                        Ready to upgrade your farm?
                    </h3>
                    <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
                        Explore our full product range or get in touch with our team for
                        personalized recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            asChild
                            className="bg-white text-primary hover:bg-white/90 font-bold px-8 h-12 gap-2"
                        >
                            <Link href="/products">
                                Explore Products
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            variant="outline"
                            className="border-white/40 text-white hover:bg-white/10 font-bold px-8 h-12"
                        >
                            <Link href="/contact">Contact Us</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
