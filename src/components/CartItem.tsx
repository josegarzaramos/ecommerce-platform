"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useAppDispatch } from "@/lib/redux/hooks";
import { removeFromCart } from "@/lib/redux/slices/cartSlice";
import type { CartItem as CartItemType } from "@/lib/definitions";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const imageUrl = item.images?.[0] || "/placeholder.svg";

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-4">
        <Image
          src={imageUrl}
          alt={item.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-md object-cover"
        />
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">
            {item.quantity} x ${item.price.toFixed(2)}
          </p>
        </div>
      </div>
      <button
        onClick={handleRemove}
        className="text-gray-400 hover:text-red-500"
        aria-label={`Remove ${item.name} from cart`}
      >
        <X size={20} />
      </button>
    </div>
  );
}
