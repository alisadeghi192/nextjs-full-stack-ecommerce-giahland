import { Logo } from "@/components/shared/layout/public/header";
import { IOrder } from "@/features/order/types/order.types";
import { toPersianCode, toPersianDateAndTime } from "@/lib/utils/format";
import OrderStatusBadge from "./OrderStatusBadge";

interface FactorInfoProps {
  order: IOrder;
}

export default function FactorInfo({ order }: FactorInfoProps) {
  const {userInfo} = order
  return (
    <>
      <div className="mx-auto mt-3 w-fit scale-150">
        <Logo />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 max-[580px]:grid-cols-1">
        {/* tracking code */}
        <div className="flex items-center gap-3 pr-4">
          <h1 className="text-lg font-bold max-md:text-base">
            کد پیگیری:{" "}
            {toPersianCode(order.trackingCode || order._id.slice(-8))}
          </h1>
          <OrderStatusBadge status={order.status} />
        </div>
        {/* date */}
        <span className="ltr pl-4 font-medium max-md:font-normal">
          {toPersianDateAndTime(new Date(order.createdAt))}
        </span>
        {/* customer full name*/}
        <div className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm max-sm:text-sm">
          <span className="text-neutral10">خریدار: </span>
          <span className="font-medium max-md:font-normal">
            {userInfo.firstName} {userInfo.lastName}
          </span>
        </div>{" "}
        {/* customer mobile*/}
        <div className="flex w-full items-center justify-between rounded-xl bg-white px-4 py-2 shadow-sm max-sm:text-sm">
          <span className="text-neutral10">موبایل خریدار:</span>
          <span className="font-medium max-md:font-normal">
            {toPersianCode(userInfo.mobile)}
          </span>
        </div>
        {/* delivery method */}
        <div className="max-xs:flex max-xs:items-center max-xs:justify-between rounded-xl bg-white px-4 py-2 shadow-sm">
          <span className="text-neutral10 max-sm:text-sm">روش تحویل:</span>
          <p className="max-xs:mt-0 mt-1 font-medium max-[580px]:text-sm max-md:font-normal">
            {order.deliveryMethod === "courier"
              ? "ارسال با پیک مخصوص 🚚"
              : " تحویل حضوری در گیاه‌لند🌱"}
          </p>
        </div>
        {/* customer address */}
        <div className="rounded-xl bg-white px-4 py-2 shadow-sm">
          <span className="text-neutral10 max-sm:text-sm">آدرس خریدار:</span>
          <p className="mt-1 font-medium max-[580px]:text-sm max-md:font-normal">
            {order.deliveryMethod === "courier" ? (
              <>
                {order.address || "ثبت نشده"}
                <br /> کد پستی:{toPersianCode(userInfo.postalCode)}
              </>
            ) : (
              <>{order.address || "ثبت نشده"}</>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
