"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "./AnimatedSection";

export function DealerCTA() {
    return (
        <section className="py-20 bg-[#1a4d2e] relative isolate overflow-hidden">
            {/* Background Pattern */}
            <svg
                aria-hidden="true"
                className="absolute inset-0 -z-10 h-full w-full stroke-white/10"
                style={{ maskImage: "radial-gradient(100% 100% at top right, white, transparent)" }}
            >
                <defs>
                    <pattern id="dealer-pattern" width="200" height="200" patternUnits="userSpaceOnUse" x="50%" y="-1">
                        <path d="M.5 200V.5H200" fill="none" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dealer-pattern)" strokeWidth="0" />
            </svg>

            {/* Gradient blob */}
            <div className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl">
                <div
                    className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#f4c025] to-[#dca510] opacity-20"
                    style={{
                        clipPath: "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <AnimatedSection className="max-w-2xl text-center md:text-left">
                    <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white ring-1 ring-inset ring-white/20 mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-[#f4c025] mr-2" />
                        Business Opportunity
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Partner with India&apos;s Fastest Growing Agri-Brand
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-gray-300">
                        Exclusive territories available. Join our network of 500+ successful dealers across the nation and grow your business with premium support.
                    </p>
                </AnimatedSection>

                <AnimatedSection delay={0.2} className="flex-shrink-0">
                    <Link
                        href="/contact"
                        className="bg-[#f4c025] hover:bg-[#dca510] text-[#1c180d] text-base font-bold py-4 px-8 rounded-lg shadow-xl shadow-black/20 hover:shadow-2xl transition-all hover:scale-105 flex items-center gap-2"
                    >
                        Apply for Dealership
                        <ArrowUpRight className="w-5 h-5" />
                    </Link>
                    <p className="text-white/60 text-xs mt-3 text-center">Response within 24 hours</p>
                </AnimatedSection>
            </div>
        </section>
    );
}
