import FactorHeader from "@/components/features/order/FactorHeader";
import FactorInfo from "@/components/features/order/FactorInfo";
import FactorItems from "@/components/features/order/FactorItems";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getOrderByIdAction } from "@/features/order/actions/getOrderById.actions";
import { redirect } from "next/navigation";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const result = await getOrderByIdAction(id);
  if (!result.success || !result.order) {
  }

  const order = result.order;

  return (
    <div className="w-full space-y-4">
      <FactorHeader href="/admin/orders" />
      <div className="border-neutral3 bg-neutral2 rounded-2xl border p-4 shadow-lg">
        <FactorInfo order={order} />
        <FactorItems order={order} />
      </div>
    </div>
  );
}
