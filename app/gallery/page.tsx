"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: string;
  span: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1625246333195-bf7913e612fc?q=80&w=2070&auto=format&fit=crop",
    alt: "Tractor working in the field",
    category: "field",
    span: "col-span-1 row-span-1 md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1592860956971-555f653a63e7?q=80&w=2070&auto=format&fit=crop",
    alt: "Farm equipment at work",
    category: "field",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
    alt: "Factory welding process",
    category: "factory",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1595181775791-7667ff46949b?q=80&w=2070&auto=format&fit=crop",
    alt: "Harvesting season",
    category: "field",
    span: "col-span-1 row-span-1",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop",
    alt: "Assembly line",
    category: "factory",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1560493676-04071c5f467b?q=80&w=2668&auto=format&fit=crop",
    alt: "Happy farmer with equipment",
    category: "farmers",
    span: "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2670&auto=format&fit=crop",
    alt: "Golden wheat field",
    category: "field",
    span: "col-span-1 row-span-1",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1530507629858-e49769a7d975?q=80&w=2670&auto=format&fit=crop",
    alt: "Equipment in action",
    category: "field",
    span: "col-span-1 row-span-1",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    alt: "Quality testing lab",
    category: "factory",
    span: "col-span-1 row-span-1",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=2069&auto=format&fit=crop",
    alt: "Farmland panorama",
    category: "farmers",
    span: "col-span-1 row-span-1 md:col-span-2 md:row-span-1",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1517424683050-8b02c8172945?q=80&w=1974&auto=format&fit=crop",
    alt: "Equipment close-up",
    category: "factory",
    span: "col-span-1 row-span-1",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1535242208474-9a2793260ca8?q=80&w=1964&auto=format&fit=crop",
    alt: "Ploughing the field",
    category: "field",
    span: "col-span-1 row-span-1",
  },
];

const tabs = [
  { value: "all", label: "All" },
  { value: "field", label: "Field Photos" },
  { value: "factory", label: "Factory Unit" },
  { value: "farmers", label: "Happy Farmers" },
];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 border border-white/20 rounded-full" />
          <div className="absolute -bottom-10 -left-10 w-56 h-56 border border-white/15 rounded-full" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-white/60 font-semibold uppercase tracking-widest text-sm mb-3">
              Visual Gallery
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Machinery in <span className="text-[#D4A843]">Action</span>
            </h1>
            <p className="text-white/70 text-lg">
              See our equipment at work across farms, factories, and field
              demonstrations across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Filter Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-10"
          >
            <TabsList className="bg-muted/50 p-1 h-auto flex-wrap">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-6 py-2.5 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Grid */}
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className={`relative rounded-xl overflow-hidden group cursor-pointer ${item.span}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white text-sm font-medium">{item.alt}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">
            See something you like?
          </h3>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
            Get in touch with our team to learn more about any of our equipment
            or find a dealer near you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              className="bg-primary text-white hover:bg-primary/90 font-bold px-8 h-12 gap-2"
            >
              <Link href="/contact">
                <MapPin className="w-4 h-4" />
                Find a Dealer
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 h-12 gap-2"
            >
              <a
                href="https://wa.me/919574245964"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp for Details
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
