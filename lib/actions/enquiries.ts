"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEnquiries() {
    return await prisma.enquiry.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function createEnquiry(data: {
    name: string;
    email: string;
    message: string;
}) {
    const enquiry = await prisma.enquiry.create({
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
    });
    revalidatePath("/admin/enquiries");
    return enquiry;
}

export async function updateEnquiryStatus(id: string, status: string) {
    const enquiry = await prisma.enquiry.update({
        where: { id },
        data: { status },
    });
    revalidatePath("/admin/enquiries");
    return enquiry;
}
