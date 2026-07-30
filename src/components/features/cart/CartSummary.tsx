"use client";

import { toPersianNumber, toPersianPrice } from "@/lib/utils/format";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
}

export default function CartSummary({ totalItems, totalPrice }: CartSummaryProps) {
  return (
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade3 rounded-xl border p-4 shadow-lg">
      <h3 className="mb-4 text-lg font-bold max-md:text-base">خلاصه سبد خرید</h3>

      <div className="space-y-3">
        <div className="flex justify-between ">
          <span className="text-neutral9 dark:text-text-dark">تعداد کالا</span>
          <span className="font-medium">{toPersianNumber(totalItems)}</span>
        </div>

        <div className="flex justify-between ">
          <span className="text-neutral9 dark:text-text-dark">جمع کل</span>
          <span className="font-medium">{toPersianPrice(totalPrice)}</span>
        </div>

        <div className="flex justify-between ">
          <span className="text-neutral9 dark:text-text-dark">هزینه ارسال</span>
          <span className="font-medium">محاسبه در تسویه</span>
        </div>

        <div className="border-t dark:border-neutral10 pt-3">
          <div className="flex justify-between text-base font-bold">
            <span>مبلغ قابل پرداخت</span>
            <span className="text-primary dark:text-primary-dark text-xl">{toPersianPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}