export const dynamic = 'force-dynamic';

import dynamicImport from "next/dynamic";
import { ProductSlider } from "@/components/home/ProductSlider";
import { QuickProductStrip } from "@/components/home/QuickProductStrip";
import { getProducts } from "@/lib/actions/products";

const Stats = dynamicImport(() => import("@/components/home/Stats").then(mod => mod.Stats));
const WhyChooseUs = dynamicImport(() => import("@/components/home/WhyChooseUs").then(mod => mod.WhyChooseUs));
const Testimonials = dynamicImport(() => import("@/components/home/Testimonials").then(mod => mod.Testimonials));
const DealerCTA = dynamicImport(() => import("@/components/home/DealerCTA").then(mod => mod.DealerCTA));
const CallbackRequest = dynamicImport(() => import("@/components/home/CallbackRequest").then(mod => mod.CallbackRequest));
const FloatingWhatsApp = dynamicImport(() => import("@/components/home/FloatingWhatsApp").then(mod => mod.FloatingWhatsApp));

export default async function Home() {
  const products = await getProducts();

  // Serialize complex objects for the client component
  const serializedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: Number(p.price),
    category: p.category,
    status: p.status,
    imageUrl: p.imageUrl,
    images: p.images || [],
  }));

  return (
    <div className="flex flex-col">
      {/* Hero Product Slider */}
      <ProductSlider products={serializedProducts} />

      {/* Quick Product Strip */}
      <QuickProductStrip products={serializedProducts} />

      {/* Stats Band */}
      <Stats />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* Dealer CTA */}
      <DealerCTA />

      {/* Callback Request */}
      <CallbackRequest />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
