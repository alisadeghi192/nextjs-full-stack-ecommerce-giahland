import OrderStatusBadge from "@/components/features/order/OrderStatusBadge";
import SectionTitle from "@/components/panel/SectionTitle";
import { DashboardOrder } from "@/features/order/types/order.types";
import { formatPrice, toPersianCode } from "@/lib/utils/format";
import Link from "next/link";
import { MdKeyboardArrowLeft } from "react-icons/md";

interface RecentOrdersProps {
  orders: DashboardOrder[];
}

export default async function RecentOrders({ orders }: RecentOrdersProps) {
  if (orders.length === 0) {
    return (
      <div className="border-neutral3 rounded-xl border bg-white p-5 shadow-lg">
        <SectionTitle title="📋 آخرین سفارش‌ها" />
        <p className="text-neutral9 py-4 text-center">
          هیچ سفارشی ثبت نشده است.
        </p>
      </div>
    );
  }

  return (
    <div className="border-neutral3 rounded-xl border bg-white p-4 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <SectionTitle title="آخرین سفارش‌ها📋" className="mb-0!" />

        <Link
          href="/admin/orders"
          className="text-primary hover:text-shade2 *: flex items-center justify-center text-sm"
        >
          <span className="">مشاهده همه</span>
          <MdKeyboardArrowLeft className="size-5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-primary text-center text-sm">
              <th className="max-xs:p-1 p-2">کد پیگیری</th>
              <th className="max-xs:p-1 p-2 max-[550px]:hidden">خریدار</th>
              <th className="max-xs:p-1 p-2">مبلغ</th>
              <th className="max-xs:p-1 w-28 p-2">وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="group bg-neutral2 text-center">
                <td className="max-xs:p-1 p-2 py-3">
                  <Link
                    href={`/admin/orders/${order._id}`}
                    className="hover:text-primary group-hover:text-primary transition-colors"
                  >
                    {toPersianCode(order.trackingCode || order._id.slice(-8))}
                  </Link>
                </td>
                <td className="group-hover:text-primary transition-colors max-xs:p-1 max-w-50 truncate overflow-hidden p-2 py-3 max-[550px]:hidden">
                  <Link href={`/admin/users/${order.userInfo.userId}`}>
                    {order.userInfo.firstName} {order.userInfo.lastName}
                  </Link>
                </td>
                <td className="max-xs:p-1 p-2 py-3">
                  <span className="max-xs:hidden">
                    {formatPrice(order.finalAmount)}
                  </span>
                  <span className="xs:hidden">
                    {formatPrice(order.finalAmount, false)}
                  </span>
                </td>
                <td className="max-xs:p-1 p-2 py-3">
                  <span>
                    <OrderStatusBadge status={order.status} />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
