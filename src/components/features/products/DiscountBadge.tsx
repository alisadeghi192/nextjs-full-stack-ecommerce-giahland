interface DiscountBadgeProps {
  discount: number;
}

export default function DiscountBadge({ discount }: DiscountBadgeProps) {
  if (discount <= 0) return null;

  return (
    <span className="bg-bg-error text-error absolute top-5 right-5 rounded-xl px-1 text-xs/5.5 font-bold">
      {discount}%
    </span>
  );
}
