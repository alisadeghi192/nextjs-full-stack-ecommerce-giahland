"use client";

import OutlineButton from "@/components/shared/ui/OutlineButton";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { useCartStoreActions } from "@/features/cart/selectors/cart.selectors";
import { toPersianCode, toPersianPrice } from "@/lib/utils/format";
import { useEffect, useRef } from "react";

type PaymentSuccessVariant = "order" | "consultation";

interface PaymentSuccessProps {
  variant: PaymentSuccessVariant;
  trackingCode: string;
  price: number;
  extraInfo?: {
    label: string;
    value: string;
  };
}

export default function PaymentSuccess({
  variant,
  trackingCode,
  price,
  extraInfo,
}: PaymentSuccessProps) {
  const isConsultation = variant === "consultation";
  const { clearCart } = useCartStoreActions();
  const clearedRef = useRef(false);

  useEffect(() => {
    if (variant === "order" && !clearedRef.current) {
      clearedRef.current = true;
      clearCart();
    }
  }, [variant, clearCart]);

  const config = {
    message: isConsultation
      ? "مشاوره شما با موفقیت ثبت شد."
      : "پرداخت شما با موفقیت انجام شد.",
    codeLabel: isConsultation ? "کد مشاوره" : "کد پیگیری",
    infoMessage: isConsultation
      ? "برای اطلاعات بیشتر به پنل کاربری بخش مشاوره‌ها مراجعه کنید."
      : "برای اطلاعات بیشتر به پنل کاربری بخش سفارش‌ها مراجعه کنید.",

    secondarybuttonText: isConsultation ? "صفحه اصلی" : "سفارش‌های من",
    secondarybuttonLink: isConsultation ? "/" : "/user/orders",

    primaryBuutonText: isConsultation ? "مشاوره‌های من" : "صفحه اصلی",
    primaryButtinLink: isConsultation ? "/user/consultations/list" : "/",
  };

  return (
    <div className="border-neutral3 w-full max-w-md rounded-2xl border bg-white p-8 text-center shadow-xl">
      <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
        <svg
          className="h-10 w-10 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-800">پرداخت موفق</h1>
      <p className="text-neutral9 mt-2">{config.message}</p>

      <div className="border-neutral3 mt-6 rounded-xl border p-4 text-right">
        <div className="flex justify-between py-1">
          <span className="text-neutral9">{config.codeLabel}</span>
          <span className="font-medium">{toPersianCode(trackingCode)}</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-neutral9">مبلغ پرداختی</span>
          <span className="text-primary font-medium">{toPersianPrice(price)}</span>
        </div>
        {extraInfo && (
          <div className="flex justify-between py-1">
            <span className="text-neutral9">{extraInfo.label}</span>
            <span className="font-medium">{extraInfo.value}</span>
          </div>
        )}
      </div>

      <p className="text-neutral9 mt-2 text-sm">{config.infoMessage}</p>

      <div className="mt-6 space-y-3">
        <PrimaryButton href={config.primaryButtinLink} className="h-12 w-full">
          {config.primaryBuutonText}
        </PrimaryButton>
        <OutlineButton
          href={config.secondarybuttonLink}
          className="h-12 w-full"
        >
          {config.secondarybuttonText}
        </OutlineButton>
      </div>
    </div>
  );
}
