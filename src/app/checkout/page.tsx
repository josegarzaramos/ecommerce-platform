import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Checkout</h1>
      <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
        <section>
          <h2 className="mb-4 text-2xl font-semibold">Shipping Information</h2>
          <CheckoutForm />
        </section>
        <section className="rounded-lg border bg-gray-50 p-6 shadow-sm">
          <h2 className="mb-4 text-2xl font-semibold">Your Order</h2>
          <OrderSummary />
        </section>
      </div>
    </div>
  );
}
