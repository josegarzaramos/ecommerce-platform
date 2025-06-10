"use client";

import { useAppDispatch } from "@/lib/redux/hooks";
import { addItem } from "@/lib/redux/slices/cartSlice";
import type { Product } from "@prisma/client";

export type SerializableProduct = Omit<
  Product,
  "price" | "createdAt" | "updatedAt"
> & {
  price: number;
  createdAt: string;
  updatedAt: string;
};

export default function AddToCartButton({
  product,
}: {
  product: SerializableProduct;
}) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    alert(`${product.name} added to cart!`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-300"
    >
      Add to Cart
    </button>
  );
}
