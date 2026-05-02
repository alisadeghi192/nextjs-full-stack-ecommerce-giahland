import { toPersianNumber } from "@/lib/utils/format";

interface DiscountBadgeProps {
  discount: number;
  className? : string
}

export default function DiscountBadge({ discount , className }: DiscountBadgeProps) {
  if (discount <= 0) return null;

  return (
    <span className={`bg-bg-error text-error  rounded-xl px-1 text-xs/5.5 font-bold ${className}`}>
      {toPersianNumber(discount)}%
    </span>
  );
}
