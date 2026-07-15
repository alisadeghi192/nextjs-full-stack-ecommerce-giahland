"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { formatPrice, toPersianCode } from "@/lib/utils/format";
import { useState } from "react";
import {
  MdArrowBack,
  MdCheckCircle,
  MdPayment,
  MdSecurity,
} from "react-icons/md";

interface PaymentCardProps {
  title: string;
  amount: number;
  code?: string;
  codeLabel?: string;
  extraInfo?: {
    label: string;
    value: string;
  };
  isLoading?: boolean;
  onSubmit: () => Promise<{ success: boolean; message?: string } | void>;
  onBack?: () => void;
}

export default function PaymentCard({
  title,
  amount,
  code,
  codeLabel = "کد",
  extraInfo,
  isLoading = false,
  onSubmit,
  onBack,
}: PaymentCardProps) {
  const [loading, setLoading] = useState(isLoading);

  const formattedAmount = formatPrice(amount);

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit();
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="border-neutral3 relative w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="bg-primary h-2 w-full"></div>

        <button
          onClick={onBack || (() => window.history.back())}
          className="absolute top-4 left-4 flex h-8 w-25 cursor-pointer items-center justify-center gap-x-1 rounded-full bg-gray-100 px-4 text-gray-600 transition-colors hover:bg-gray-200"
        >
          <span>بازگشت</span>
          <MdArrowBack className="size-5 shrink-0" />
        </button>

        <div className="p-8">
          <div className="mb-4 text-center">
            <div className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
              <MdPayment className="text-primary h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {code && (
              <p className="text-neutral9 mt-1 text-sm">
                {codeLabel}: {toPersianCode(code)}
              </p>
            )}
            {extraInfo && (
              <p className="text-primary mt-2">{extraInfo.value}</p>
            )}
          </div>

          <div className="border-primary/20 bg-primary/5 mb-4 rounded-xl border p-4 text-center">
            <span className="text-neutral8 text-sm">مبلغ قابل پرداخت</span>
            <div className="mt-1 text-3xl font-bold">{formattedAmount}</div>
            <span className="text-neutral9 mt-1 inline-flex items-center gap-1 text-xs">
              <MdSecurity className="size-3" />
              پرداخت امن و رمزنگاری شده
            </span>
          </div>


          <div className="mb-6 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-center">
            <p className="text-xs text-yellow-700">
              🔒 این یک درگاه پرداخت آزمایشی است.
            </p>
          </div>

          <PrimaryButton
            onClick={handleSubmit}
            disabled={loading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-white transition-all duration-200 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                در حال پردازش...
              </>
            ) : (
              <>
                <MdCheckCircle className="h-5 w-5" />
                تأیید پرداخت آزمایشی
              </>
            )}
          </PrimaryButton>

          <p className="text-neutral9 mt-4 text-center text-xs">
            با کلیک روی دکمه، شما با شرایط و قوانین سایت موافقت می‌کنید.
          </p>
        </div>
      </div>
    </div>
  );
}
