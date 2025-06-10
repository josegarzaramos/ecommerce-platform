import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import type { Product } from "@prisma/client";

async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer">
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden rounded-t-lg">
                <Image
                  src={product.images[0] || "/images/placeholder.jpg"}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="text-2xl font-bold text-right">
                  ${product.price.toNumber().toFixed(2)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
