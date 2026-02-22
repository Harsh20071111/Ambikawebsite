"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteProduct } from "@/lib/actions/products";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  category: string;
  status: string;
  imageUrl: string | null;
  createdAt: string;
}

export function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    try {
      const result = await deleteProduct(id);
      if (!result.success) {
        alert(result.error || "Failed to delete product");
      } else {
        router.refresh();
      }
    } catch (_error) {
      alert("An unexpected error occurred");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      {products.length === 0 ? (
        <div className="p-12 text-center">
          <p className="text-muted-foreground text-lg mb-4">No products yet</p>
          <Link
            href="/admin/products/add"
            className="text-primary font-semibold hover:underline"
          >
            Add your first product →
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Product
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Price
                </th>
                <th className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Status
                </th>
                <th className="text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-muted/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 relative">
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                          {product.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground/80">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-foreground">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : product.status === "Out of Stock"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deleting === product.id}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-30"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
