"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useAppSelector } from "@/lib/redux/hooks";
import CartSidebar from "./CartSidebar";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            NextCommerce
          </Link>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative"
            aria-label={`Open cart with ${totalItems} items`}
          >
            <ShoppingBag className="h-6 w-6 text-gray-600" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </header>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
