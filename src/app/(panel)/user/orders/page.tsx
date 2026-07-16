import OrderCard from "@/components/features/order/OrderCard";
import OrdersSearch from "@/components/features/order/OrdersSearch";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/pagination";
import { getUserOrdersAction } from "@/features/order/actions/getUserOrders.actions";
import { IOrder } from "@/features/order/types/order.types";
import { ORDERS_PER_PAGE } from "@/lib/constants/pagination";

interface UserOrdersPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function UserOrdersPage({ searchParams }: UserOrdersPageProps) {
  const { search = "", page = "1" } = await searchParams;
  const currentPage = Number(page) || 1;

  const result = await getUserOrdersAction({
    search,
    page: currentPage,
    limit: ORDERS_PER_PAGE,
  });

  const baseUrl = `?search=${search}`;

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between max-xs:flex-col max-xs:gap-y-3">
        <SectionTitle title="سفارش‌های من" className="mb-0! ml-auto" />
        <div className="w-72 max-xs:w-full">
          <OrdersSearch defaultValue={search} />
        </div>
      </div>

      {result.orders.length === 0 ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          {search ? "سفارشی با این کد پیگیری یافت نشد." : "هیچ سفارشی ثبت نشده است."}
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {result.orders.map((order: IOrder & { totalItems: number }) => (
              <OrderCard key={order._id} order={order} />
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