import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) {
    notFound();
  }

  const serializableProduct = {
    ...product,
    price: product.price.toNumber(),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };

  return (
    <main className="max-w-7xl mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative w-full aspect-square">
          <Image
            src={product.images[0] || "/images/placeholder.jpg"}
            alt={product.name}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-6 text-lg">{product.description}</p>
          <div className="mt-auto">
            <p className="text-3xl font-extrabold mb-6">
              ${product.price.toNumber().toFixed(2)}
            </p>

            <AddToCartButton product={serializableProduct} />
          </div>
        </div>
      </div>
    </main>
  );
}
