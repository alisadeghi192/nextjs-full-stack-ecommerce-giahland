"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { confirmPaymentAction } from "@/features/payment/actions/confirmPayment.actions";
import { formatPrice, toPersianCode } from "@/lib/utils/format";
import { useCartStoreActions } from "@/stores/selectors/cart.selectors";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  MdArrowBack,
  MdCheckCircle,
  MdPayment,
  MdSecurity,
} from "react-icons/md";

interface PaymentPageClientProps {
  orderId: string;
  finalAmount: number;
  orderCode?: string;
}

export default function PaymentPageClient({
  orderId,
  finalAmount,
  orderCode,
}: PaymentPageClientProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { clearCart } = useCartStoreActions();
  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const result = await confirmPaymentAction(orderId);

      if (result.success) {
        toast.success("پرداخت با موفقیت انجام شد");
        await clearCart();
        router.push(`/payment/success/${orderId}`);
      } else {
        toast.error(result.message || "خطا در پرداخت");
      }
    } catch (error) {
      toast.error("خطا در پرداخت");
    } finally {
      setIsLoading(false);
    }
  };

  const formattedAmount = formatPrice(finalAmount);

  return (
    <div className="flex items-center justify-center">
      <div className="border-neutral3 relative w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
        <div className="bg-primary h-2 w-full"></div>

        <button
          onClick={() => router.back()}
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
            <h2 className="text-2xl font-bold">پرداخت سفارش</h2>
            {orderCode && (
              <p className="text-neutral9 mt-1 text-sm">
                کد سفارش: {toPersianCode(orderCode)}
              </p>
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
              🔒 این یک درگاه پرداخت آزمایشی است. برای ادامه تست، روی دکمه زیر
              کلیک کنید.
            </p>
          </div>

          <PrimaryButton
            onClick={handlePayment}
            disabled={isLoading}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 text-white transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
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
