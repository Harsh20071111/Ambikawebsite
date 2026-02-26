import { notFound } from "next/navigation";
import { getProductById } from "@/lib/actions/products";
import EditProductForm from "./EditProductForm";

export const dynamic = 'force-dynamic';

export default async function EditProductPage(props: {
    params: Promise<{ id: string }>;
}) {
    const params = await props.params;
    const product = await getProductById(params.id);

    if (!product) {
        notFound();
    }

    // Pass JSON-serializable product to client component
    return <EditProductForm product={JSON.parse(JSON.stringify(product))} />;
}
