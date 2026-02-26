const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany({ take: 1 });
  if (products.length > 0) {
    console.log("Found product:", products[0]);
    const updated = await prisma.product.update({
      where: { id: products[0].id },
      data: { name: products[0].name + " (Edited)" }
    });
    console.log("Updated product:", updated);
    // revert
    await prisma.product.update({
      where: { id: products[0].id },
      data: { name: products[0].name }
    });
    console.log("Reverted.");
  } else {
    console.log("No products found.");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
