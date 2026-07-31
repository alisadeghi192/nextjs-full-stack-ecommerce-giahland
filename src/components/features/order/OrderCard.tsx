"use client";

import { IOrder } from "@/features/order/types/order.types";
import {
  toPersianCode,
  toPersianDate,
  toPersianNumber,
  toPersianPrice,
} from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import OrderStatusBadge from "./OrderStatusBadge";

interface OrderCardProps {
  order: IOrder & { totalItems: number };
}

export default function OrderCard({ order }: OrderCardProps) {
  const { items, trackingCode, createdAt, finalAmount, status, _id } = order;

  const displayItems = items.slice(0, 3);
  const remainingCount = items.length - 3;
  const isSidebarOpen = useIsSidebarOpen();
  return (
    <Link href={`/user/orders/${_id}`} className="block">
      <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 bg-neutral2 dark:bg-shade3 hover:border-primary group cursor-pointer rounded-xl border p-4 shadow-lg transition-all hover:shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-x-2">
            <span>کد پیگیری:</span>
            <span>{toPersianCode(trackingCode || "")}</span>
            <OrderStatusBadge status={status} />
          </div>
          <span className="text-neutral9 dark:text-text-dark dark:group-hover:text-primary-dark group-hover:text-primary flex items-center gap-x-2 text-sm font-medium transition-colors">
            <span className="max-sm:hidden"> مشاهده جزئیات</span>
            <MdOutlineKeyboardArrowLeft className="text-neutral9 dark:text-text-dark group-hover:text-primary dark:group-hover:text-primary-dark size-6 transition-colors" />
          </span>
        </div>

        <div
          className={`mt-3 flex items-center gap-x-4 ${isSidebarOpen ? "max-lg:flex-col max-lg:gap-y-3" : "max-sm:flex-col max-sm:gap-y-3"} `}
        >
          <div className="text-neutral10 dark:text-text-dark dark:bg-shade1 flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 max-sm:text-sm">
            <span>تاریخ ثبت سفارش:</span>
            <span>{toPersianDate(new Date(createdAt))}</span>
          </div>
          <div className="text-neutral10 dark:text-text-dark dark:bg-shade1 flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 max-sm:text-sm">
            <span>مبلغ کل:</span>
            <span>{toPersianPrice(finalAmount)}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-x-3">
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
              <div className="text-neutral11 dark:text-neutral12 absolute bottom-0 left-0 flex size-6 items-center justify-center rounded-lg bg-white text-sm font-bold opacity-80 dark:bg-gray-400">
                {toPersianNumber(item.quantity)}
              </div>
            </div>
          ))}
          {remainingCount > 0 && (
            <div className="max-xs:size-14 dark:text-neutral12 bg-neutral4 flex size-18 shrink-0 items-center justify-center rounded-lg text-sm font-medium text-gray-600 dark:bg-gray-400">
              +{toPersianNumber(remainingCount)}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
