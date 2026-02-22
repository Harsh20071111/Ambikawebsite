"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { AnimatedSection } from "./AnimatedSection";

const testimonials = [
  {
    name: "Gurpreet Singh",
    location: "Rajasthan",
    text: "The hydraulic trolley from AMBIKA ENGINEERING has been a game-changer for my farm. The build quality is unmatched and it handles rough terrain like a dream.",
    rating: 5,
  },
  {
    name: "Rajesh Patel",
    location: "Gujarat",
    text: "We switched to AMBIKA ENGINEERING cultivators last season and saw a significant improvement in soil preparation. Their after-sales support is excellent.",
    rating: 5,
  },
  {
    name: "Sukhwinder Kaur",
    location: "Haryana",
    text: "Best rotavator I've ever used. The blades are incredibly durable and the machine runs smoothly even on the hardest soil. Highly recommended!",
    rating: 5,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const goToNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, 6000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="py-16 lg:py-24 bg-[#fcfbf8] border-t border-[#e8e2ce]">
      <div className="max-w-4xl mx-auto px-4 lg:px-10">
        <AnimatedSection className="text-center mb-12">
          <span className="text-[#dca510] font-bold tracking-wider uppercase text-sm mb-2 block">
            Testimonials
          </span>
          <h2 className="text-[#1c180d] text-3xl md:text-4xl font-extrabold leading-tight">
            What Farmers Say
          </h2>
        </AnimatedSection>

        <div className="relative min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#f4c025]/10 rounded-full mb-6">
                <Quote className="w-6 h-6 text-[#dca510]" />
              </div>
              <blockquote className="text-xl md:text-2xl text-[#1c180d] font-medium leading-relaxed mb-6 max-w-3xl mx-auto">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-1 mb-3">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: Static rating stars
                    <span key={i} className="text-[#f4c025] text-lg">
                      ★
                    </span>
                  ),
                )}
              </div>
              <p className="font-bold text-[#1c180d]">
                {testimonials[current].name}
              </p>
              <p className="text-gray-500 text-sm">
                {testimonials[current].location}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((testimonial, i) => (
            <button
              type="button"
              key={testimonial.name}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-[#f4c025]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
