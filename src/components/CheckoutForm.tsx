"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppSelector } from "@/lib/redux/hooks";
import { ShippingFormFields, shippingSchema } from "@/lib/definitions";

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShippingFormFields>({
    resolver: zodResolver(shippingSchema),
  });

  const cartItems = useAppSelector((state) => state.cart.items);

  const onSubmit: SubmitHandler<ShippingFormFields> = async (shippingData) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const orderResponse = await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...shippingData, cartItems }),
    });

    const orderResult = await orderResponse.json();

    if (!orderResult.success || !orderResult.orderId) {
      alert("Failed to create the initial order. Please try again.");
      return;
    }

    try {
      const stripeResponse = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartItems: cartItems.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            images: item.images,
          })),
          orderId: orderResult.orderId,
        }),
      });

      const stripeResult = await stripeResponse.json();

      if (stripeResult.error) {
        console.error("Stripe API Error:", stripeResult.error);
        const errorMessage =
          stripeResult.error.message ||
          "Failed to initialize payment. Please try again.";
        alert(errorMessage);
        return;
      }

      if (stripeResult.session?.url) {
        window.location.href = stripeResult.session.url;
      }
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      alert("An unexpected error occurred while preparing your payment.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Contact Information
        </h2>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email address
          </label>
          <div className="mt-1">
            <input
              type="email"
              id="email"
              {...register("email")}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium text-gray-900">
          Shipping Information
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First name
            </label>
            <input
              type="text"
              id="firstName"
              {...register("firstName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {errors.firstName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {errors.lastName && (
              <p className="mt-2 text-sm text-red-600">
                {errors.lastName.message}
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {errors.address && (
              <p className="mt-2 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              {...register("city")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {errors.city && (
              <p className="mt-2 text-sm text-red-600">{errors.city.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              {...register("country")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {errors.country && (
              <p className="mt-2 text-sm text-red-600">
                {errors.country.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="postalCode"
              className="block text-sm font-medium text-gray-700"
            >
              Postal code
            </label>
            <input
              type="text"
              id="postalCode"
              {...register("postalCode")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
            />
            {errors.postalCode && (
              <p className="mt-2 text-sm text-red-600">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Processing..." : "Proceed to Payment"}
        </button>
      </div>
    </form>
  );
}
