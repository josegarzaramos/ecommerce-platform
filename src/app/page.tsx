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
          <div
            key={product.id}
            className="border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {product.images.length > 0 && (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden rounded-t-lg">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

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
        ))}
      </div>
    </main>
  );
}
