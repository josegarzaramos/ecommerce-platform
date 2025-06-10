import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import Image from "next/image";

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
            <button className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
