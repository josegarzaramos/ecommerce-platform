import type { Product as PrismaProduct } from "@prisma/client";
import { z } from "zod";

export type Product = PrismaProduct;

export type SerializableProduct = Omit<
  PrismaProduct,
  "price" | "createdAt" | "updatedAt"
> & {
  price: number;
  createdAt: string;
  updatedAt: string;
};

export interface CartItem extends SerializableProduct {
  quantity: number;
  images: string[];
}

export const shippingSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  address: z.string().min(1, { message: "Address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  postalCode: z
    .string()
    .min(5, { message: "Postal code must be at least 5 characters." }),
  country: z.string().min(1, { message: "Country is required." }),
});

export type ShippingFormFields = z.infer<typeof shippingSchema>;
