"use client";

import { formatPrice, toPersianNumber } from "@/lib/utils/format";

interface CheckoutItemsProps {
  items: any[];
  totalItems: number;
  totalPrice: number;
  shippingCost: number;
  finalTotal: number;
}

export default function CheckoutItems({
  items,
  totalItems,
  totalPrice,
  shippingCost,
  finalTotal,
}: CheckoutItemsProps) {
  return (
    <div className="border-neutral3 rounded-xl border p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-bold text-lg max-md:text-base">سبد خرید</span>
        <span className="text-neutral8 text-sm">
          ({toPersianNumber(totalItems)} کالا)
        </span>
      </div>

      <div className="max-h-60 space-y-4 overflow-y-auto custom-scroll pl-1">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center  text-sm">
            <span className="line-clamp-1">
              {toPersianNumber(index+1)}- {(item.product as any).name} × {toPersianNumber(item.quantity)}
            </span>
            <span className="shrink-0">
              {formatPrice((item.product as any).price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-4 border-t pt-3">
        <div className="flex justify-between items-center text-sm">
          <span>جمع کل</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>هزینه ارسال</span>
          <span>{shippingCost > 0 ? formatPrice(shippingCost) : "رایگان"}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span className="max-md:text-base">مبلغ قابل پرداخت</span>
          <span className="text-primary">{formatPrice(finalTotal)}</span>
        </div>
      </div>
    </div>
  );
}