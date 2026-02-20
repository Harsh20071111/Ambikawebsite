import { ProductSlider } from "@/components/home/ProductSlider";
import { QuickProductStrip } from "@/components/home/QuickProductStrip";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/home/Testimonials";
import { DealerCTA } from "@/components/home/DealerCTA";
import { CallbackRequest } from "@/components/home/CallbackRequest";
import { Stats } from "@/components/home/Stats";
import { FloatingWhatsApp } from "@/components/home/FloatingWhatsApp";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Product Slider */}
      <ProductSlider />

      {/* Quick Product Strip */}
      <QuickProductStrip />

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
