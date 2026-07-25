"use client";

import OrderStatusBadge from "@/components/features/order/OrderStatusBadge";
import SectionTitle from "@/components/panel/SectionTitle";
import { toPersianCode, toPersianDate, toPersianPrice } from "@/lib/utils/format";
import Link from "next/link";

interface UserRecentOrdersProps {
  orders: {
    _id: string;
    trackingCode?: string;
    finalAmount: number;
    status: "pending" | "paid" | "delivered";
    createdAt: Date;
  }[];
}

export default function UserRecentOrders({ orders }: UserRecentOrdersProps) {
  return (
    <div className="border-neutral3 rounded-xl border bg-white p-4 shadow-lg">
      <SectionTitle title="آخرین سفارش‌ها 📦" className="mb-2!" />
      {orders.length === 0 ? (
        <p className="text-neutral9 text-center">هیچ سفارشی ثبت نشده است.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-primary text-right text-sm">
                <th className="p-2 text-center">کد پیگیری</th>
                <th className="p-2 text-center">مبلغ</th>
                <th className="p-2 text-center max-xs:hidden">وضعیت</th>
                <th className="p-2 text-center">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="group bg-neutral2 text-center">
                  <td className="p-2 text-center font-medium">
                    <Link
                      href={`/admin/orders/${order._id}`}
                      className="group-hover:text-primary transition-colors"
                    >
                      {toPersianCode(order.trackingCode || order._id.slice(-8))}
                    </Link>
                  </td>
                  <td className="p-2 text-center">
                    <span className="max-sm:hidden">
                      {toPersianPrice(order.finalAmount)}
                    </span>
                    <span className="sm:hidden">
                      {toPersianPrice(order.finalAmount, false)}
                    </span>
                  </td>
                  <td className="p-2 text-center max-xs:hidden">
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td className="text-neutral9 p-2 text-center text-sm">
                    {toPersianDate(new Date(order.createdAt))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
