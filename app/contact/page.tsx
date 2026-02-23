"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createEnquiry } from "@/lib/actions/enquiries";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Sales",
    detail: "+91 95742 45964",
    sub: "Mon - Sat, 9AM - 6PM",
    href: "tel:+919574245964",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Us",
    detail: "+91 95742 45964",
    sub: "Quick responses, 24/7",
    href: "https://wa.me/919574245964",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "harshpanchal200011@gmail.com",
    sub: "harshpanchal200011@gmail.com",
    href: "mailto:harshpanchal200011@gmail.com",
  },
  {
    icon: MapPin,
    title: "Factory Address",
    detail: "Ambika Engineering, Opp GEB, Modasa Road",
    sub: "Talod, Sabarkantha, Gujarat 383215",
    href: "https://maps.app.goo.gl/8pnVH51XiBhkdoA7A",
  },
];

export default function ContactPage() {
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
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border border-white/30 rounded-full" />
          <div className="absolute bottom-10 left-20 w-40 h-40 border border-white/20 rounded-full" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-white/60 font-semibold uppercase tracking-widest text-sm mb-3">
              Get In Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Let&apos;s Cultivate{" "}
              <span className="text-[#D4A843]">Success</span> Together
            </h1>
            <p className="text-white/70 text-lg">
              Have a question, need a quote, or want to become a dealer?
              We&apos;re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form - 2/3 width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border border-border shadow-sm">
                <CardContent className="p-8 md:p-10">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        Message Sent Successfully!
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Thank you for reaching out. Our team will review your
                        inquiry and get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-1">
                          Request a Price Quote
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          Fill in the details below and our team will get back
                          to you with the best pricing.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your full name"
                            required
                            className="h-12 bg-muted/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91 XXXXX XXXXX"
                            required
                            className="h-12 bg-muted/30"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="h-12 bg-muted/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="equipment">Equipment Type *</Label>
                          <Select>
                            <SelectTrigger className="h-12 bg-muted/30">
                              <SelectValue placeholder="Select equipment" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="trolley">
                                Hydraulic Trolley
                              </SelectItem>
                              <SelectItem value="cultivator">
                                Cultivator
                              </SelectItem>
                              <SelectItem value="rotavator">
                                Rotavator
                              </SelectItem>
                              <SelectItem value="plough">Plough</SelectItem>
                              <SelectItem value="harvester">
                                Harvester
                              </SelectItem>
                              <SelectItem value="custom">
                                Custom Fabrication
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            placeholder="e.g., Gujarat"
                            required
                            className="h-12 bg-muted/30"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="district">District</Label>
                          <Input
                            id="district"
                            placeholder="e.g., Sabarkantha"
                            className="h-12 bg-muted/30"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your requirements, quantity needed, or any specific customizations..."
                          required
                          rows={5}
                          className="resize-none bg-muted/30"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-13 bg-primary hover:bg-primary/90 text-white font-bold text-base rounded-lg shadow-lg disabled:opacity-50"
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
                            Submit Inquiry
                            <Send className="w-4 h-4" />
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Sidebar - 1/3 width */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {contactInfo.map((info, _i) => (
                <a
                  key={info.title}
                  href={info.href}
                  target={info.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    info.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="block"
                >
                  <Card className="border border-border hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 group-hover:bg-primary rounded-xl flex items-center justify-center transition-colors shrink-0">
                        <info.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-0.5">
                          {info.title}
                        </h3>
                        <p className="text-sm text-foreground/80">
                          {info.detail}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {info.sub}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}

              {/* Google Map */}
              <Card className="border border-border overflow-hidden">
                <div className="h-64 w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.5!2d73.1!3d23.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c514e7adaf0cb%3A0xe6fb4acb7baa3c98!2sAmbika%20Engineering!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ambika Engineering Location"
                  />
                </div>
              </Card>

              {/* Become a Dealer */}
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6 text-center space-y-3">
                  <Building2 className="w-8 h-8 text-primary mx-auto" />
                  <h3 className="font-bold text-foreground">Become a Dealer</h3>
                  <p className="text-sm text-muted-foreground">
                    Interested in partnering with AMBIKA ENGINEERING? Join our
                    dealer network.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white font-semibold"
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a
          href="tel:+919574245964"
          className="flex items-center justify-center w-14 h-14 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Call us"
        >
          <Phone className="w-6 h-6" />
        </a>
        <a
          href="https://wa.me/919574245964"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
