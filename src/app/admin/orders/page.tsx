import AdminOrderCard from "@/components/admin/orders/AdminOrderCard";
import AdminOrdersHeader from "@/components/admin/orders/AdminOrdersHeader";
import Pagination from "@/components/shared/ui/pagination";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getAdminOrders } from "@/features/order/actions/getAdminOrders.actions";
import { IOrder } from "@/features/order/types/order.types";
import { ORDERS_PER_PAGE } from "@/lib/constants/pagination";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{
    status?: string;
    search?: string;
    page?: string;
  }>;
}

export default async function AdminOrdersPage({ searchParams }: PageProps) {
  const { user } = await getMeAction();
  if (!user || user.role !== "admin") {
    redirect("/");
  }

  const params = await searchParams;
  const status = (params.status as "pending" | "paid" | "delivered" | "all") || "all";
  const search = params.search || "";
  const currentPage = Number(params.page) || 1;

  const result = await getAdminOrders({
    status,
    search,
    page: currentPage,
    limit: ORDERS_PER_PAGE,
  });

  const {orders} = result


  const baseUrl = `?status=${status}&search=${search}`;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">مدیریت سفارش‌ها</h2>
      </div>

      <AdminOrdersHeader />

      {orders.length === 0 ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          {search ? "سفارشی با این کد پیگیری یافت نشد." : "هیچ سفارشی ثبت نشده است."}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {orders.map((order: IOrder & { totalItems: number }) => (
              <AdminOrderCard
                key={order._id}
                order={order}
              />
            ))}
          </div>

          {result.totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={result.totalPages}
                baseUrl={baseUrl}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}