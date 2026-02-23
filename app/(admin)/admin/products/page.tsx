export const dynamic = 'force-dynamic';

import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { ProductsTable } from "./ProductsTable";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage your agricultural equipment catalog
          </p>
        </div>
        <Link
          href="/admin/products/add"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-md transition-colors text-sm"
        >
          + Add Product
        </Link>
      </div>

      {/* Table */}
      <ProductsTable products={JSON.parse(JSON.stringify(products))} />
    </div>
  );
}
