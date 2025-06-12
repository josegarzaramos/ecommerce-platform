export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

type OrderSuccessPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const { orderId } = await params;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
    cacheStrategy: {
      swr: 0,
      ttl: 0,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="container mx-auto max-w-2xl rounded-lg bg-white p-8 text-center shadow-lg">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
          Thank You for Your Order!
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Your order has been placed successfully. A confirmation email has been
          sent to{" "}
          <span className="font-medium text-gray-800">{order.email}</span>.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Order ID: <span className="font-mono text-gray-700">{order.id}</span>
        </p>

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 text-left">
          <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
          <ul className="mt-4 space-y-4 divide-y divide-gray-200">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 pt-4 first:pt-0"
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-md">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-gray-200 pt-6">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
