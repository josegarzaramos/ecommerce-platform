"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";

export default function Header() {
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          NextCommerce
        </Link>

        <Link href="/cart" className="relative">
          <ShoppingBag className="h-6 w-6 text-gray-600" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}
