import OrderCard from "@/components/features/order/OrderCard";
import SectionTitle from "@/components/panel/SectionTitle";
import Pagination from "@/components/shared/ui/Pagination";
import PanelSearch from "@/components/shared/ui/PanelSearch";
import { getUserOrdersAction } from "@/features/order/actions/getUserOrders.actions";
import { IOrder } from "@/features/order/types/order.types";
import { ORDERS_PER_PAGE } from "@/lib/constants/pagination";
import { toPersianNumber } from "@/lib/utils/format";

interface UserOrdersPageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function UserOrdersPage({
  searchParams,
}: UserOrdersPageProps) {
  const { search = "", page = "1" } = await searchParams;
  const currentPage = Number(page) || 1;

  const result = await getUserOrdersAction({
    search,
    page: currentPage,
    limit: ORDERS_PER_PAGE,
  });

  const baseUrl = `?search=${search}`;

  return (
    <section className="w-full">
      <div className="max-xs:flex-col max-xs:gap-y-3 mb-4 flex items-center justify-between">
        <SectionTitle title={`سفارش‌های من(${toPersianNumber(result.total)})`} className="mb-0! ml-auto" />
        <div className="max-xs:w-full w-72">
          <PanelSearch
            id="order-search"
            label="جستجوی کد پیگیری"
            defaultValue={search}
          />
        </div>
      </div>

      {result.orders.length === 0 ? (
        <div className="border-neutral3 rounded-2xl border p-6 text-center text-gray-500 shadow-lg">
          {search
            ? "سفارشی با این کد پیگیری یافت نشد."
            : "هیچ سفارشی ثبت نشده است."}
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
    </section>
  );
}
