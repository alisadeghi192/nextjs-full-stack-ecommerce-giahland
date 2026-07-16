import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { IOrder } from "@/features/order/types/order.types";

interface FactorPaymentButtonProps {
  order: IOrder;
}

export default function FactorPaymentButton({
  order,
}: FactorPaymentButtonProps) {
  return (
    <div className="flex justify-end gap-3">
      <PrimaryButton
        href={`/payment/${order._id}`}
        className="mx-6 h-12 px-8 text-lg max-sm:w-full"
      >
        پرداخت فاکتور
      </PrimaryButton>
    </div>
  );
}
