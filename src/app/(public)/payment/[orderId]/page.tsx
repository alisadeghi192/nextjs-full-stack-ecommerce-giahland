import PaymentCard from "@/components/features/payment/PaymentCard";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getOrderByIdAction } from "@/features/order/actions/getOrderById.actions";
import { confirmPaymentAction } from "@/features/payment/actions/confirmPayment.actions";
import { notFound, redirect } from "next/navigation";

interface OrderPaymentPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderPaymentPage({ params }: OrderPaymentPageProps) {
  const { orderId } = await params;

  const { user } = await getMeAction();
  if (!user) {
    redirect("/login-register");
  }

  const result = await getOrderByIdAction(orderId);
  if (!result.success || !result.order) {
    notFound();
  }

  const order = result.order;

  if (order.user !== user._id) {
    notFound();
  }

  if (order.status === "paid") {
    redirect("/user/orders");
  }

  async function handlePayment() {
    "use server";

    const result = await confirmPaymentAction(orderId);

    if (result.success) {
      redirect(`/payment/success/${orderId}`);
    }

    return {
      success: false,
      message: result.message || "خطا در پرداخت",
    };
  }

  return (
    <div className="flex  mt-10 max-xs:mt-6 items-center justify-center">
      <PaymentCard
        title="پرداخت سفارش"
        amount={order.finalAmount}
        code={order.trackingCode}
        codeLabel="کد سفارش"
        isLoading={false}
        onSubmit={handlePayment}
      />
    </div>
  );
}