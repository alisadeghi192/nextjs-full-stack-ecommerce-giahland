"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { updateOrderStatusAction } from "@/features/order/actions/updateOrderStatus.actions";
import { IOrder } from "@/features/order/types/order.types";
import {
  formatDate,
  formatPrice,
  toPersianCode,
  toPersianNumber,
} from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import OrderStatusBadge from "../../features/order/OrderStatusBadge";

interface AdminOrderCardProps {
  order: IOrder & { totalItems: number };
}

export default function AdminOrderCard({ order }: AdminOrderCardProps) {
  const { items, trackingCode, createdAt, finalAmount, status, _id } = order;

  const [isUpdating, setIsUpdating] = useState(false);
  const displayItems = items.slice(0, 3);
  const remainingCount = items.length - 3;
  const isSidebarOpen = useIsSidebarOpen();

  const handleStatusUpdate = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (status !== "paid") {
      return;
    }
    setIsUpdating(true);
    const result = await updateOrderStatusAction(_id, "delivered");
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsUpdating(false);
  };

  const canChangeStatus = status === "paid";

  return (
    <Link href={`/admin/orders/${_id}`} className="block">
      <div className="border-neutral3 bg-neutral2 hover:border-primary group rounded-xl border p-4 shadow-lg transition-all hover:shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-x-2">
            <span>کد پیگیری:</span>
            <span>{toPersianCode(trackingCode || "")}</span>
            <OrderStatusBadge status={status} />
          </div>
          <span className="text-neutral9 group-hover:text-primary flex items-center gap-x-2 text-sm font-medium transition-colors">
            <span className="max-sm:hidden">مشاهده جزئیات</span>
            <MdOutlineKeyboardArrowLeft className="text-neutral9 group-hover:text-primary size-6 transition-colors" />
          </span>
        </div>

        <div
          className={`mt-3 flex items-center gap-x-4 ${isSidebarOpen ? "max-lg:flex-col max-lg:gap-y-3" : "max-sm:flex-col max-sm:gap-y-3"}`}
        >
          <div className="text-neutral10 flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 max-sm:text-sm">
            <span>تاریخ ثبت سفارش:</span>
            <span>{formatDate(new Date(createdAt))}</span>
          </div>
          <div className="text-neutral10 flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 max-sm:text-sm">
            <span>مبلغ کل:</span>
            <span>{formatPrice(finalAmount)}</span>
          </div>
        </div>
        <div
          className={`mt-3 flex items-center gap-x-4 ${isSidebarOpen ? "max-lg:flex-col max-lg:gap-y-3" : "max-sm:flex-col max-sm:gap-y-3"}`}
        >
          <div className="text-neutral10 flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 max-sm:text-sm">
            <span> خریدار:</span>
            <span>
              {order.userInfo.firstName} {order.userInfo.lastName}
            </span>
          </div>
          <div className="text-neutral10 flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 max-sm:text-sm">
            <span> موبایل خریدار:</span>
            <span>{toPersianCode(order.userInfo.mobile)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-x-3 max-sm:flex-col max-sm:gap-y-3">
          <div className="ml-auto flex items-center gap-x-3">
            {displayItems.map((item, index) => (
              <div
                key={index}
                className="relative size-18 shrink-0 overflow-hidden rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={72}
                  className="size-full object-cover"
                />
                <div className="text-neutral11 absolute bottom-0 left-0 flex size-6 items-center justify-center rounded-lg bg-white text-sm font-bold opacity-80">
                  {toPersianNumber(item.quantity)}
                </div>
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="max-xs:size-14 bg-neutral4 flex size-18 shrink-0 items-center justify-center rounded-lg text-sm font-medium text-gray-600">
                +{toPersianNumber(remainingCount)}
              </div>
            )}
          </div>

          {canChangeStatus && (
            <PrimaryButton
              onClick={(e) => {
                e.preventDefault();;
                handleStatusUpdate(e);
              }}
              disabled={isUpdating}
              className="mr-auto h-10 shrink-0 px-4 text-sm"
            >
              {isUpdating ? "در حال تغییر..." : "تغییر به تحویل شده"}
            </PrimaryButton>
          )}
        </div>
      </div>
    </Link>
  );
}
