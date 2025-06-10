import type { Product as PrismaProduct } from "@prisma/client";

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
}
