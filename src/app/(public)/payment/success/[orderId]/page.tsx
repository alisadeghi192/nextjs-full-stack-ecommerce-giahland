import OutlineButton from "@/components/shared/ui/OutlineButton";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { getMeAction } from "@/features/auth/actions/me.actions";
import { getOrderByIdAction } from "@/features/order/actions/getOrderById.actions";
import { formatPrice, toPersianCode } from "@/lib/utils/format";
import { notFound, redirect } from "next/navigation";

interface PaymentSuccessPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function PaymentSuccessPage({
  params,
}: PaymentSuccessPageProps) {
  const { orderId } = await params;

  const { user } = await getMeAction();
  if (!user) {
    redirect("/login-register");
  }

  const result = await getOrderByIdAction(orderId);
  if (!result.success || !result.order) {
    notFound();
  }

  const order = result.order;

  if (order.user !== user._id) {
    notFound();
  }

  return (
    <main className="container flex items-center justify-center mt-10 max-xs:mt-6">
      <div className=" px-4">
        <div className="w-full  rounded-2xl bg-white p-8 text-center shadow-xl">
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
          <p className="text-neutral9 mt-2">
            سفارش شما با موفقیت ثبت و پرداخت شد.
          </p>

          <div className="border-neutral3 mt-6 rounded-xl border p-4 text-right">
            <div className="flex justify-between py-1">
              <span className="text-neutral9">کد پیگیری</span>
              <span className="font-medium">
                {toPersianCode(order.trackingCode)}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral9">مبلغ پرداختی</span>
              <span className="text-primary font-medium">
                {formatPrice(order.finalAmount)}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-neutral9">روش تحویل</span>
              <span className="font-medium">
                {order.deliveryMethod === "courier"
                  ? "ارسال با پیک"
                  : "تحویل حضوری"}
              </span>
            </div>
          </div>
          <p className="text-neutral9 mt-2 text-sm">
            برای اطلاعات بیشتر به پنل کاربری بخش سفارش ها مراجعه کنید.
          </p>

          <div className="mt-6 space-y-3">
            <PrimaryButton href="/" className="h-12 w-full">
              صفحه اصلی
            </PrimaryButton>
            <OutlineButton href="/user/orders" className="h-12">
              سفارش های من
            </OutlineButton>
          </div>
        </div>
      </div>
    </main>
  );
}
