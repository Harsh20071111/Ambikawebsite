"use client";

import { useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "framer-motion";

const stats = [
    { label: "Machines Delivered", value: 5300, suffix: "+" },
    { label: "Years of Excellence", value: 15, suffix: "+" },
    { label: "Dealer Network", value: 500, suffix: "+" },
    { label: "Made in India", value: 100, suffix: "%" },
];

export function Stats() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-10 bg-[#1a4d2e]">
            <div className="max-w-7xl mx-auto px-4 lg:px-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center py-4 relative">
                            {/* Divider between stats */}
                            {i < stats.length - 1 && (
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-10 bg-white/10 hidden md:block" />
                            )}
                            <div className="text-3xl md:text-5xl font-extrabold text-white mb-1">
                                {isInView ? (
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
                            <p className="text-white/50 text-xs font-semibold uppercase tracking-widest">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
