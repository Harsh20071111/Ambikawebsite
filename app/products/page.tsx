import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getProducts } from "@/lib/actions/products";

export default async function ProductsPage() {
  const products = await getProducts();

  // Serialize the data to pass to client component (in case of Dates/Decimals)
  const serializedProducts = JSON.parse(JSON.stringify(products));

  return <ProductCatalog initialProducts={serializedProducts} />;
}
