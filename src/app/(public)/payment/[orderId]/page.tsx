import PaymentPageClient from "@/components/features/payment/PaymentPageClient";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getOrderByIdAction } from "@/features/order/actions/getOrderById.actions";
import { notFound, redirect } from "next/navigation";

interface PaymentPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function PaymentPage({ params }: PaymentPageProps) {
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

  return (
    <main className="container mt-10">
      <PaymentPageClient
        orderId={orderId}
        finalAmount={order.finalAmount}
        orderCode={order.trackingCode}
      />
    </main>
  );
}