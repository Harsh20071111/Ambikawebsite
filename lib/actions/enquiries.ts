"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getEnquiries() {
  try {
    return await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch enquiries:", error);
    return [];
  }
}

export async function createEnquiry(data: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const enquiry = await prisma.enquiry.create({
      data: {
        name: data.name,
        email: data.email,
        message: data.message,
      },
    });
    revalidatePath("/admin/enquiries");
    return enquiry;
  } catch (error) {
    console.error("Failed to create enquiry:", error);
    return null;
  }
}

export async function updateEnquiryStatus(id: string, status: string) {
  try {
    const enquiry = await prisma.enquiry.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/enquiries");
    return enquiry;
  } catch (error) {
    console.error("Failed to update enquiry status:", error);
    return null;
  }
}
