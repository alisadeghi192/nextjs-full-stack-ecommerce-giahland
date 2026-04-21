"use client";
import { formatPrice } from "@/lib/utils/format";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";

interface PriceSectionProps {
  price: number;
  discount?: number;
}

export default function PriceSection({
  price,
  discount = 0,
}: PriceSectionProps) {
  const finalPrice = getDiscountedPrice(price, discount);
  const hasDiscount = discount > 0;

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2">
      {hasDiscount && (
        <span className="text-error relative mr-auto text-sm/6.25">
          {formatPrice(price, false)}
          <span className="bg-error mr-0-auto absolute top-1/2 block h-px w-full"></span>
        </span>
      )}
      <span className="mr-auto text-lg/8 max-sm:text-base/7.25">
        {formatPrice(finalPrice)}
      </span>
    </div>
  );
}
