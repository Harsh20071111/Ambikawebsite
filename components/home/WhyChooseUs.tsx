"use client";

import { motion } from "framer-motion";
import { Award, Shield, Tag, Truck } from "lucide-react";
import {
  AnimatedSection,
  itemVariants,
  StaggerContainer,
} from "./AnimatedSection";

const features = [
  {
    icon: Shield,
    title: "High-Grade Boron Steel",
    description:
      "Forged blades and chassis designed for maximum durability in hard, dry soil conditions.",
  },
  {
    icon: Award,
    title: "2-Year Warranty",
    description:
      "Comprehensive coverage on all moving parts. We stand by our manufacturing quality.",
  },
  {
    icon: Tag,
    title: "Factory-Direct Pricing",
    description:
      "No middlemen commissions. Get affordable rates straight from the manufacturer.",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description:
      "Extensive logistics and service network covering 20+ states across India.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#f4c025]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#1a4d2e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-10 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#dca510] font-bold tracking-wider uppercase text-sm mb-2 block">
            Why Farmers Trust Us
          </span>
          <h2 className="text-[#1c180d] text-3xl md:text-4xl font-extrabold leading-tight tracking-[-0.033em]">
            Built for Indian Soil, Engineered for Performance
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Experience the difference of engineering designed specifically for
            local farming conditions and crop varieties.
          </p>
        </AnimatedSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="flex flex-col items-start p-6 rounded-2xl bg-[#fcfbf8] border border-[#e8e2ce] hover:border-[#f4c025]/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-14 w-14 rounded-xl bg-[#f4c025]/10 text-[#dca510] flex items-center justify-center mb-6 group-hover:bg-[#f4c025] group-hover:text-[#1c180d] transition-colors duration-300">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-[#1c180d] text-xl font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
