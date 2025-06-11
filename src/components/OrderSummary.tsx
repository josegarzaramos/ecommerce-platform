"use client";

import { useAppSelector } from "@/lib/redux/hooks";
import Image from "next/image";

export default function OrderSummary() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <p className="text-center text-gray-500">
        Your cart is empty. Add items to see your order summary.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={item.images?.[0] || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-md object-cover"
              />
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="font-semibold">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between text-lg font-semibold">
          <p>Subtotal</p>
          <p>${subtotal.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Shipping and taxes will be calculated at the next step.
        </p>
      </div>
    </div>
  );
}
