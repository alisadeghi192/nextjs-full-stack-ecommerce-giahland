import PaymentSuccess from "@/components/features/payment/PaymentSuccess";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getOrderByIdAction } from "@/features/order/actions/getOrderById.actions";
import { notFound, redirect } from "next/navigation";

interface OrderSuccessPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const { orderId } = await params;

  const { user } = await getMeAction();
  if (!user) redirect("/login-register");

  const result = await getOrderByIdAction(orderId);
  if (!result.success || !result.order) {
    notFound();
  }
  if (result.order.user !== user._id) {
    notFound();
  }
  if (result.order.status === "pending") {
    redirect("/user/orders");
  }

  const order = result.order;

  return (
    <section className="max-xs:mt-6 container mt-10 flex items-center justify-center">
      <PaymentSuccess
        variant="order"
        trackingCode={order.trackingCode}
        price={order.finalAmount}
        extraInfo={{
          label: "روش تحویل",
          value:
            order.deliveryMethod === "courier" ? "ارسال با پیک" : "تحویل حضوری",
        }}
      />
    </section>
  );
}
