import { getProducts } from "@/lib/actions/products";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const products = await getProducts();

  // Flatten all product images into gallery items
  const images = products.flatMap(
    (product: {
      name: string;
      category: string;
      images: string[];
      imageUrl?: string | null;
    }) => {
      // Gather all image sources: the images array + the primary imageUrl
      const allSrcs = [
        ...(product.images || []),
        ...(product.imageUrl && !product.images?.includes(product.imageUrl)
          ? [product.imageUrl]
          : []),
      ];

      return allSrcs.map((src) => ({
        src,
        productName: product.name,
        category: product.category,
      }));
    },
  );

  return (
    <div className="min-h-screen bg-background">
      <GalleryGrid images={images} />
    </div>
  );
}
