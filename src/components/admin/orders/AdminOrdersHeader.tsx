"use client";

import OrdersSearch from "@/components/features/order/OrdersSearch";
import SortDropdown from "@/components/shared/ui/SortDropdown";
import { useUrlParams } from "@/lib/hooks/useUrlParams";

const statusOptions = [
  { value: "all", label: "همه" },
  { value: "pending", label: "پرداخت نشده" },
  { value: "paid", label: "در حال آماده‌سازی" },
  { value: "delivered", label: "تحویل داده شده" },
];

export default function AdminOrdersHeader() {
  const { get, set } = useUrlParams();

  const status = get("status") || "all";
  const search = get("search") || "";

  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-4 max-sm:flex-col max-sm:items-stretch">
      <div className="flex items-center gap-3 max-sm:flex-col max-sm:gap-2">
        <div className="w-48 max-sm:w-full">
          <SortDropdown
            selectedSort={status}
            onSortChange={(value) => set("status", value)}
            options={statusOptions}
            usedInPanel={true}
          />
        </div>
      </div>

      <div className="w-64 max-sm:w-full">
        <OrdersSearch defaultValue={search} />
      </div>
    </div>
  );
}