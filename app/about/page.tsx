"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const aboutStats = [
  { label: "Machines Delivered", value: 5300, suffix: "+" },
  { label: "Years of Excellence", value: 15, suffix: "+" },
  { label: "Dealer Network", value: 350, suffix: "+" },
  { label: "Made in India", value: 100, suffix: "%" },
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
              From a small workshop in Talod to a nationally trusted brand — our
              journey is built on a commitment to quality, innovation, and the
              Indian farmer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-10 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {aboutStats.map((stat, _i) => (
              <div key={stat.label} className="text-center py-4">
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

      {/* Customer Reviews */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-3">
              Trusted by Farmers
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Real feedback from farmers across India who rely on Ambika
              Engineering equipment every season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Ramesh Patel",
                location: "Mehsana, Gujarat",
                rating: 5,
                review:
                  "Been using Ambika trolleys for 8 years now. The build quality is unmatched — no rust, no breakdowns even in harsh monsoon conditions. Best investment for my farm.",
                product: "Heavy Duty Trolley",
              },
              {
                name: "Suresh Yadav",
                location: "Indore, MP",
                rating: 5,
                review:
                  "The hydraulic cultivator I bought from Ambika saves me hours of work. Their after-sales service is excellent too. Highly recommended!",
                product: "Hydraulic Cultivator",
              },
              {
                name: "Bhavesh Desai",
                location: "Rajkot, Gujarat",
                rating: 5,
                review:
                  "Switched to Ambika from another brand and the difference is night and day. Stronger steel, smoother operation, and the price is very fair.",
                product: "Rotavator",
              },
              {
                name: "Mohan Singh",
                location: "Udaipur, Rajasthan",
                rating: 4,
                review:
                  "Great quality seed drill. Easy to operate and very durable. My only wish is they had a service center closer to my area, but the product itself is top-notch.",
                product: "Seed Drill",
              },
              {
                name: "Kiran Chaudhary",
                location: "Nashik, Maharashtra",
                rating: 5,
                review:
                  "Our entire cooperative uses Ambika equipment. Consistent quality across all their products. The tankers especially are built like tanks!",
                product: "Water Tanker",
              },
              {
                name: "Arjun Thakur",
                location: "Anand, Gujarat",
                rating: 5,
                review:
                  "From ordering to delivery, the experience was smooth. The plough I purchased has been performing flawlessly for 3 seasons straight.",
                product: "Plough",
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="h-full border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/20 group">
                  <CardContent className="p-6 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <svg
                          key={`star-${review.name}-${starIdx}`}
                          className={`w-5 h-5 ${starIdx < review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200 fill-gray-200"
                            }`}
                          viewBox="0 0 20 20"
                          aria-hidden="true"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-5">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    {/* Divider */}
                    <div className="h-px bg-border mb-4" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <span className="text-primary font-bold text-sm">
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {review.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {review.location} · {review.product}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
