import { toPersianPrice } from "@/lib/utils/format";
import { getDiscountedPrice } from "@/lib/utils/price";

import DiscountBadge from "./DiscountBadge";

interface PriceSectionProps {
  price: number;
  discount: number;
  bold? : boolean ;
  variant: "product-card" | "purchase-card" | "sticky-footer";
}

export default function PriceSection({
  price,
  discount = 0,
  bold = false,
  variant = "product-card",
}: PriceSectionProps) {
  const finalPrice = getDiscountedPrice(price, discount);
  const hasDiscount = discount > 0;

  if (variant === "purchase-card") {
    return (
      <div
        className={`${hasDiscount ? "mt-6 mb-3 pt-3" : "my-6 pt-6"} border-neutral7 dark:border-neutral10 border-t max-sm:hidden`}
      >
        {hasDiscount && (
          <div className="flex items-center gap-x-2 justify-self-end">
            <span className="text-error relative text-sm/6.25">
              {toPersianPrice(price, false)}
              <span className="bg-error mr-0-auto absolute top-1/2 block h-px w-full"></span>
            </span>
            <DiscountBadge discount={discount} />
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="leading-7.25">قیمت:</span>
          <span className="text-xl/9">{toPersianPrice(finalPrice)}</span>
        </div>
      </div>
    );
  }

  if (variant === "sticky-footer") {
    return (
      <div className="flex flex-col items-end">
        {hasDiscount && (
          <div className="flex items-center gap-x-2 justify-self-end">
            <span className="text-error relative text-sm/6.25">
              {toPersianPrice(price, false)}
              <span className="bg-error mr-0-auto absolute top-1/2 block h-px w-full"></span>
            </span>
            <DiscountBadge discount={discount} />
          </div>
        )}
        <span className="text-xl/9 font-bold max-[400px]:text-lg">{toPersianPrice(finalPrice)}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2">
      {hasDiscount && (
        <span className="text-error relative mr-auto text-sm/6.25">
          {toPersianPrice(price, false)}
          <span className="bg-error mr-0-auto absolute top-1/2 block h-px w-full"></span>
        </span>
      )}
      <span className={`mr-auto text-lg/8 max-sm:text-base/7.25 ${bold && 'font-bold' }`}>
        {toPersianPrice(finalPrice)}
      </span>
    </div>
  );
}
