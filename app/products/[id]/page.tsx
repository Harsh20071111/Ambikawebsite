import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/products/ProductGallery";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getProductById } from "@/lib/actions/products";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Fetch actual product from DB
  const product = await getProductById(id);

  // If not found, return 404
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <div className="bg-muted/40 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Image Gallery */}
          <ProductGallery
            images={
              product.images && product.images.length > 0
                ? product.images
                : product.imageUrl
                  ? [product.imageUrl]
                  : []
            }
            productName={product.name}
            category={product.category}
            status={product.status}
          />

          {/* Right - Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-primary font-semibold uppercase tracking-widest text-sm">
                  {product.category}
                </p>
                <div className="bg-[#f4c025] text-[#1c180d] text-lg font-bold px-4 py-2 rounded-lg shadow-sm">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
                {product.description ||
                  "Premium agricultural equipment designed for maximum efficiency and durability in the field. Built with high-grade materials to withstand tough Indian farming conditions."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-8 gap-2 rounded-xl text-base shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
              >
                <a
                  href="https://wa.me/919574245964"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5" />
                  Inquire on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold h-14 px-8 gap-2 rounded-xl text-base transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <a href="tel:+919574245964">
                  <Phone className="w-5 h-5" />
                  Call for Quote
                </a>
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-foreground">
                Key Advantages
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Premium build quality",
                  "Designed for Indian conditions",
                  "Easy maintenance",
                  "Warranty included",
                ].map((feature, _i) => (
                  <div
                    key={feature}
                    className="flex items-start gap-3 bg-muted/50 p-4 rounded-xl border border-border/50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-foreground/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tech Specs Table */}
        <div className="mt-20">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-primary rounded-sm" />
            Technical Specifications
          </h2>
          <Card className="overflow-hidden border border-border shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-primary/5 hover:bg-primary/5">
                  <TableHead className="font-bold text-foreground w-1/3 py-5 text-base">
                    Specification
                  </TableHead>
                  <TableHead className="font-bold text-foreground py-5 text-base">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-foreground/80 py-4">
                    Product ID
                  </TableCell>
                  <TableCell className="text-foreground py-4">
                    {product.id}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-foreground/80 py-4">
                    Category
                  </TableCell>
                  <TableCell className="text-foreground py-4">
                    {product.category}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-foreground/80 py-4">
                    Status
                  </TableCell>
                  <TableCell className="text-foreground py-4">
                    {product.status}
                  </TableCell>
                </TableRow>
                <TableRow className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-foreground/80 py-4">
                    Listing Date
                  </TableCell>
                  <TableCell className="text-foreground py-4">
                    {product.createdAt.toLocaleDateString()}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Back + Related */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-border">
          <Button
            asChild
            variant="ghost"
            className="text-primary font-semibold gap-2 hover:bg-primary/5 rounded-xl h-12 px-6"
          >
            <Link href="/products">
              <ArrowLeft className="w-5 h-5" />
              Back to Products
            </Link>
          </Button>
          <Button
            asChild
            variant="secondary"
            className="bg-primary text-white hover:bg-primary/90 font-semibold gap-2 rounded-xl h-12 px-6 shadow-md hover:shadow-lg transition-all"
          >
            <Link href="/contact">
              Get a Custom Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
