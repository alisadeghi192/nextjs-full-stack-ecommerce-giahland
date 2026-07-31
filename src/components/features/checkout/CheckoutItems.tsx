"use client";

import { toPersianNumber, toPersianPrice } from "@/lib/utils/format";
import { getDiscountedPrice } from "@/lib/utils/price";

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
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 rounded-xl border p-4 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-bold max-md:text-base">سبد خرید</span>
        <span className="text-neutral8 dark:text-text-dark text-sm">
          ({toPersianNumber(totalItems)} کالا)
        </span>
      </div>

      <div className="custom-scroll max-h-60 space-y-4 overflow-y-auto pl-1">
        {items.map((item, index) => {
          const {product} = item
          const discountedPrice = getDiscountedPrice(product.price, product.discount);
          const finalPrice = toPersianPrice(discountedPrice * item.quantity);
          return (
            <div
              key={index}
              className="flex items-center justify-between text-sm"
            >
              <span className="line-clamp-1 dark:text-text-dark">
                {toPersianNumber(index + 1)}- {(item.product as any).name} ×{" "}
                {toPersianNumber(item.quantity)}
              </span>
              <span className="shrink-0">{finalPrice}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 space-y-4 border-t dark:border-neutral10 pt-3">
        <div className="flex items-center justify-between text-sm">
          <span className="dark:text-text-dark">جمع کل</span>
          <span>{toPersianPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="dark:text-text-dark">هزینه ارسال</span>
          <span>{shippingCost > 0 ? toPersianPrice(shippingCost) : "رایگان"}</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span className="max-md:text-base">مبلغ قابل پرداخت</span>
          <span className="text-primary dark:text-primary-dark">{toPersianPrice(finalTotal)}</span>
        </div>
      </div>
    </div>
  );
}
