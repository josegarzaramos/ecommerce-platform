"use client";

import { useProducts } from "@/hooks/useProducts";
import { useAppDispatch } from "@/lib/redux/hooks";
import { addToCart } from "@/lib/redux/slices/cartSlice";
import type { Product } from "@prisma/client";
import type { SerializableProduct } from "@/lib/definitions";

export function ProductList() {
  const { products, loading } = useProducts();
  const dispatch = useAppDispatch();

  if (loading) return <div>Loading...</div>;

  const handleAddToCart = (product: Product) => {
    const productPayload: SerializableProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: Number(product.price),
      images: product.images,
      category: product.category,
      inStock: product.inStock,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    };
    dispatch(addToCart(productPayload));
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 border rounded shadow-sm">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p className="text-gray-600 my-2">{product.description}</p>
          <p className="text-lg font-semibold">
            ${Number(product.price).toFixed(2)}
          </p>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      ))}
    </div>
  );
}
