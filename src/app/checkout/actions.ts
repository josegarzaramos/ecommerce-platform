"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const shippingSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(5),
  country: z.string().min(1),
});

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
};

export async function createOrder(
  formData: any,
  cartItems: CartItem[]
): Promise<{ success: boolean; message: string }> {
  const parsed = shippingSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, message: "Invalid shipping information." };
  }

  if (!cartItems.length) {
    return { success: false, message: "Cart is empty." };
  }

  try {
    await prisma.order.create({
      data: {
        ...parsed.data,
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.images[0] || "",
          })),
        },
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      },
    });

    return { success: true, message: "Order created successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to create order." };
  }
}
