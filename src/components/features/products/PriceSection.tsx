import { formatPrice } from "@/lib/utils/format";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";
import DiscountBadge from "./DiscountBadge";

interface PriceSectionProps {
  price: number;
  discount: number;
  variant: "product-card" | "purchase-card" | "sticky-footer";
}

export default function PriceSection({
  price,
  discount = 0,
  variant = "product-card",
}: PriceSectionProps) {
  const finalPrice = getDiscountedPrice(price, discount);
  const hasDiscount = discount > 0;

  if (variant === "purchase-card") {
    return (
      <div
        className={`${hasDiscount ? "mt-6 mb-3 pt-3" : "my-6 pt-6"} border-neutral7 border-t max-sm:hidden`}
      >
        {hasDiscount && (
          <div className="flex items-center gap-x-2 justify-self-end">
            <span className="text-error relative text-sm/6.25">
              {formatPrice(price, false)}
              <span className="bg-error mr-0-auto absolute top-1/2 block h-px w-full"></span>
            </span>
            <DiscountBadge discount={discount} />
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="leading-7.25">قیمت:</span>
          <span className="text-xl/9">{formatPrice(finalPrice)}</span>
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
              {formatPrice(price, false)}
              <span className="bg-error mr-0-auto absolute top-1/2 block h-px w-full"></span>
            </span>
            <DiscountBadge discount={discount} />
          </div>
        )}
        <span className="text-xl/9 max-[400px]:text-lg">{formatPrice(finalPrice)}</span>
      </div>
    );
  }

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
