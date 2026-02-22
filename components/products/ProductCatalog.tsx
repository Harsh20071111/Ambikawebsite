"use client";

import { motion } from "framer-motion";
import { ArrowRight, Search, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  "Trolleys",
  "Cultivators",
  "Rotavators",
  "Ploughs",
  "Harvesters",
  "Seed Drills",
  "Other",
];
const buildTypes = ["Hydraulic", "Mechanical", "Heavy Duty"];
const capacityRanges = ["Under 5 Tons", "5-10 Tons", "10+ Tons"];

// Helper function to guess build type/capacity if data is missing
// In a real app, these would be fields in the DB
// biome-ignore lint/suspicious/noExplicitAny: Expected dynamic data
const getProductTags = (product: any) => {
  let buildType = "Mechanical";
  if (product.name.toLowerCase().includes("hydraulic")) buildType = "Hydraulic";
  if (product.name.toLowerCase().includes("heavy")) buildType = "Heavy Duty";

  let capacity = "Under 5 Tons";
  if (product.price > 200000) capacity = "5-10 Tons";
  if (product.price > 400000) capacity = "10+ Tons";

  return { buildType, capacity };
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function CheckboxGroup({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string[];
  onChange: (val: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(
      selected.includes(opt)
        ? selected.filter((s) => s !== opt)
        : [...selected, opt],
    );
  };

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-widest">
        {title}
      </h4>
      <div className="space-y-2 flex flex-col items-start">
        {options.map((opt) => (
          <button
            type="button"
            key={opt}
            onClick={() => toggle(opt)}
            className="flex items-center gap-3 cursor-pointer group hover:bg-transparent"
          >
            <div
              className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all ${
                selected.includes(opt)
                  ? "bg-primary border-primary"
                  : "border-border group-hover:border-primary/50"
              }`}
            >
              {selected.includes(opt) && (
                <svg
                  aria-hidden="true"
                  className="w-3 h-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
            <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
              {opt}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function FilterContent({
  selectedCategories,
  setSelectedCategories,
  selectedBuildTypes,
  setSelectedBuildTypes,
  selectedCapacities,
  setSelectedCapacities,
  clearAll,
  activeFilterCount,
}: {
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  selectedBuildTypes: string[];
  setSelectedBuildTypes: (v: string[]) => void;
  selectedCapacities: string[];
  setSelectedCapacities: (v: string[]) => void;
  clearAll: () => void;
  activeFilterCount: number;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="h-px bg-border" />

      <CheckboxGroup
        title="Category"
        options={categories}
        selected={selectedCategories}
        onChange={setSelectedCategories}
      />

      <div className="h-px bg-border" />

      <CheckboxGroup
        title="Build Type"
        options={buildTypes}
        selected={selectedBuildTypes}
        onChange={setSelectedBuildTypes}
      />

      <div className="h-px bg-border" />

      <CheckboxGroup
        title="Capacity"
        options={capacityRanges}
        selected={selectedCapacities}
        onChange={setSelectedCapacities}
      />
    </div>
  );
}

export function ProductCatalog({
  initialProducts,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: Temporary usage until types are generated
  initialProducts: any[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBuildTypes, setSelectedBuildTypes] = useState<string[]>([]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Enhance products with derived tags
  const enhancedProducts = useMemo(() => {
    return initialProducts.map((p) => ({
      ...p,
      ...getProductTags(p),
    }));
  }, [initialProducts]);

  const activeFilterCount =
    selectedCategories.length +
    selectedBuildTypes.length +
    selectedCapacities.length;

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedBuildTypes([]);
    setSelectedCapacities([]);
  };

  const filteredProducts = useMemo(() => {
    return enhancedProducts.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const matchesBuildType =
        selectedBuildTypes.length === 0 ||
        selectedBuildTypes.includes(product.buildType);
      const matchesCapacity =
        selectedCapacities.length === 0 ||
        selectedCapacities.includes(product.capacity);

      // Also filter by status (only show Active)
      const isActive = product.status === "Active";

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBuildType &&
        matchesCapacity &&
        isActive
      );
    });
  }, [
    searchQuery,
    selectedCategories,
    selectedBuildTypes,
    selectedCapacities,
    enhancedProducts,
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-primary py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 border border-white/30 rounded-full" />
          <div className="absolute bottom-10 left-10 w-40 h-40 border border-white/20 rounded-full" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="text-white/60 font-medium uppercase tracking-widest text-sm mb-3">
              Product Catalog
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
              Agricultural Machinery
            </h1>
            <p className="text-white/70 text-lg">
              Explore our complete range of farm equipment. Built in India, for
              Indian farmers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Top bar: search + filter button + result count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              {/* Mobile filter trigger */}
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-muted rounded-lg text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                        {activeFilterCount}
                      </span>
                    )}
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-6">
                  <SheetHeader className="p-0 mb-4">
                    <SheetTitle className="sr-only">Filters</SheetTitle>
                  </SheetHeader>
                  <FilterContent
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                    selectedBuildTypes={selectedBuildTypes}
                    setSelectedBuildTypes={setSelectedBuildTypes}
                    selectedCapacities={selectedCapacities}
                    setSelectedCapacities={setSelectedCapacities}
                    clearAll={clearAll}
                    activeFilterCount={activeFilterCount}
                  />
                </SheetContent>
              </Sheet>

              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {filteredProducts.length}
                </span>{" "}
                results
              </p>
            </div>

            {/* Search */}
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-muted/50"
              />
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilterCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {[
                ...selectedCategories,
                ...selectedBuildTypes,
                ...selectedCapacities,
              ].map((filter) => (
                <button
                  type="button"
                  key={filter}
                  onClick={() => {
                    setSelectedCategories((prev) =>
                      prev.filter((f) => f !== filter),
                    );
                    setSelectedBuildTypes((prev) =>
                      prev.filter((f) => f !== filter),
                    );
                    setSelectedCapacities((prev) =>
                      prev.filter((f) => f !== filter),
                    );
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  {filter}
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors underline"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-24 bg-white rounded-xl border border-border p-6">
                <FilterContent
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setSelectedCategories}
                  selectedBuildTypes={selectedBuildTypes}
                  setSelectedBuildTypes={setSelectedBuildTypes}
                  selectedCapacities={selectedCapacities}
                  setSelectedCapacities={setSelectedCapacities}
                  clearAll={clearAll}
                  activeFilterCount={activeFilterCount}
                />
              </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${searchQuery}-${selectedCategories.join()}-${selectedBuildTypes.join()}-${selectedCapacities.join()}`}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <Card className="group overflow-hidden border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-500 bg-white h-full flex flex-col">
                      <div className="relative h-56 overflow-hidden bg-muted flex-shrink-0">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                            No Image
                          </div>
                        )}
                        {/* Derive badge from tags or status */}
                        {(product.buildType === "Heavy Duty" ||
                          product.status === "Active") && (
                          <Badge
                            className={`absolute top-3 left-3 font-semibold ${
                              product.buildType === "Heavy Duty"
                                ? "bg-[#D4A843] text-white"
                                : "bg-primary text-white"
                            }`}
                          >
                            {product.buildType === "Heavy Duty"
                              ? "Heavy Duty"
                              : "Best Seller"}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-5 space-y-2 flex flex-col flex-1">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">
                          {product.category}
                        </p>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-muted-foreground text-sm font-medium">
                          ₹{Number(product.price).toLocaleString("en-IN")}
                        </p>
                        <div className="flex-1" />
                        <Button
                          asChild
                          variant="outline"
                          className="w-full mt-3 border-primary/20 text-primary hover:bg-primary hover:text-white font-semibold transition-all gap-2"
                        >
                          <Link href={`/products/${product.id}`}>
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-20">
                  <SlidersHorizontal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl font-bold text-foreground mb-2">
                    No products found
                  </p>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query.
                  </p>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="mt-4 text-primary font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Custom Fabrication CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-primary rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              Need Custom Fabrication?
            </h3>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-6">
              We offer bespoke engineering services for specialized agricultural
              equipment tailored to your exact requirements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                className="bg-white text-primary hover:bg-white/90 font-bold px-8 h-12"
              >
                <Link href="/contact">Get a Custom Quote</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 font-bold px-8 h-12"
              >
                <a
                  href="https://wa.me/919574245964"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
