import { PrismaClient, Category } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");

  const products = [
    {
      name: "Classic T-Shirt",
      description: "A comfortable and stylish t-shirt made from 100% cotton.",
      price: 19.99,
      images: ["/images/t-shirt-1.jpg", "/images/t-shirt-2.jpg"],
      category: Category.CLOTHING,
    },
    {
      name: "Wireless Headphones",
      description: "High-fidelity wireless headphones with noise-cancellation.",
      price: 149.99,
      images: ["/images/headphones-1.jpg", "/images/headphones-2.jpg"],
      category: Category.ELECTRONICS,
    },
    {
      name: "Modern Coffee Table",
      description: "A sleek and minimalist coffee table for any living room.",
      price: 299.5,
      images: ["/images/table-1.jpg"],
      category: Category.FURNITURE,
    },
    {
      name: "Leather Backpack",
      description: "A durable and stylish leather backpack for daily use.",
      price: 89.0,
      images: ["/images/backpack-1.jpg", "/images/backpack-2.jpg"],
      category: Category.ACCESSORIES,
    },
    {
      name: "The Art of Programming",
      description: "A must-read book for any aspiring software developer.",
      price: 45.0,
      images: ["/images/book-1.jpg"],
      category: Category.BOOKS,
    },
  ];

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
