import FactorHeader from "@/components/features/order/FactorHeader";
import FactorInfo from "@/components/features/order/FactorInfo";
import FactorItems from "@/components/features/order/FactorItems";
import FactorPaymentButton from "@/components/features/order/FactorPaymentButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getOrderByIdAction } from "@/features/order/actions/getOrderById.actions";
import { notFound, redirect } from "next/navigation";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  const { user } = await getMeAction();
  if (!user) {
    redirect("/login-register");
  }

  const result = await getOrderByIdAction(id);
  if (!result.success || !result.order) {
    notFound();
  }

  const order = result.order;

  if (order.user !== user._id) {
    notFound();
  }

  const isPending = order.status === "pending";

  return (
    <div className="w-full space-y-4">
      <FactorHeader href="/user/orders"/>
      <div className="border-neutral3 bg-neutral2 rounded-2xl border p-4 shadow-lg">
        <FactorInfo order={order} />
        <FactorItems order={order} />
      </div>
      {isPending && <FactorPaymentButton order={order} />}
    </div>
  );
}
