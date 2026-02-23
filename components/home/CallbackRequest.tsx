"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createEnquiry } from "@/lib/actions/enquiries";
import { AnimatedSection } from "./AnimatedSection";

export function CallbackRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      await createEnquiry({ name, email: email || "N/A", message });
    } catch (err) {
      console.error("Error saving enquiry:", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#1a4d2e]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#f4c025]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left - Info */}
          <AnimatedSection>
            <div className="space-y-8">
              <div>
                <span className="text-[#dca510] font-bold tracking-wider uppercase text-sm mb-2 block">
                  Get in Touch
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1c180d] leading-tight">
                  Request a Callback
                </h2>
                <p className="text-gray-600 mt-3 text-lg">
                  Fill out the form and our sales team will contact you within
                  24 hours with the best offer.
                </p>
              </div>

              <div className="space-y-5">
                {[
                  {
                    icon: Phone,
                    title: "Sales Helpline",
                    text: "+91 95742 45964",
                    sub: "Mon – Sat, 9 AM to 6 PM",
                  },
                  {
                    icon: MapPin,
                    title: "Factory Visit",
                    text: "Ambika Engineering, Modasa Road, Talod",
                    sub: "Sabarkantha, Gujarat 383215",
                  },
                  {
                    icon: Clock,
                    title: "Working Hours",
                    text: "Mon – Sat: 9 AM – 6 PM",
                    sub: "Sunday: Closed",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-xl bg-[#1a4d2e]/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#1a4d2e]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#1c180d] text-sm">
                        {item.title}
                      </p>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Right - Form */}
          <AnimatedSection delay={0.15}>
            <div className="bg-[#fcfbf8] border border-[#e8e2ce] rounded-2xl p-8 md:p-10 shadow-sm">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 bg-[#1a4d2e]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Send className="w-7 h-7 text-[#1a4d2e]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1c180d] mb-2">
                    Request Received!
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Thank you! Our team will call you back within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-[#1c180d] font-semibold text-sm"
                      >
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Your full name"
                        required
                        className="h-12 bg-white border-[#e8e2ce] focus:border-[#1a4d2e] focus:ring-[#1a4d2e]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="phone"
                        className="text-[#1c180d] font-semibold text-sm"
                      >
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        className="h-12 bg-white border-[#e8e2ce] focus:border-[#1a4d2e] focus:ring-[#1a4d2e]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-[#1c180d] font-semibold text-sm"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      className="h-12 bg-white border-[#e8e2ce] focus:border-[#1a4d2e] focus:ring-[#1a4d2e]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-[#1c180d] font-semibold text-sm"
                    >
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your requirements..."
                      required
                      rows={4}
                      className="resize-none bg-white border-[#e8e2ce] focus:border-[#1a4d2e] focus:ring-[#1a4d2e]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-13 bg-[#1a4d2e] hover:bg-[#164025] text-white font-bold text-base rounded-lg shadow-lg disabled:opacity-50 transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg
                          aria-hidden="true"
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Request Callback
                        <Send className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
