"use client";

import { OrderStatus } from "@/features/order/types/order.types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: {
    label: "در انتظار پرداخت",
    className: "bg-bg-error text-error",
  },
  paid: {
    label: "در حال آماده‌سازی",
    className: "bg-blue-100 text-blue-800 ",
  },
  delivered: {
    label: "تحویل داده شده",
    className: "bg-[#BEFFD4] text-[#358C4A]",
  },
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-block rounded-xl px-1 text-nowrap text-xs/5.5 font-bold ${config.className}`}
    >
      {config.label}
    </span>
  );
}