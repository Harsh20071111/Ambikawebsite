"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({ where: { id } });
}

export async function createProduct(data: {
  name: string;
  description?: string;
  price: number;
  category: string;
  status?: string;
  imageUrl?: string;
  images?: string[];
}) {
  try {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description || null,
        price: data.price,
        category: data.category,
        status: data.status || "Active",
        imageUrl: data.imageUrl || null,
        images: data.images || [],
      },
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, data: product };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Failed to create product" };
  }
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
    status?: string;
    imageUrl?: string;
    images?: string[];
  },
) {
  try {
    const product = await prisma.product.update({
      where: { id },
      data,
    });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true, data: product };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Failed to update product" };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/admin/products");
    revalidatePath("/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Failed to delete product" };
  }
}
