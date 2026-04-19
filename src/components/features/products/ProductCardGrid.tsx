import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import LikeButton from "./LikeButton";
import AddToCartButton from "./AddToCartButton";
import PriceSection from "./PriceSection";
import ProductInfo from "./ProductInfo";
import StockStatus from "./StockStatus";
import DiscountBadge from "./DiscountBadge";
import ProductImage from "./ProductImage";

export default function ProductCardGrid({
  name,
  price,
  image,
  slug = "/",
  discount,
  potDimensions,
  stock,
}: Product) {
  const isOutOfStock = stock === 0;
  const hasDiscount = discount > 0;

  const Content = () => (
    <div className="flex flex-col">
      <ProductImage image={image} view="grid" name={name} />
      <div className="flex flex-col gap-y-4 max-sm:gap-y-2 mt-auto">
        <ProductInfo
          name={name}
          potDimensions={potDimensions}
          stock={stock}
          nameClassName="max-xs:text-sm mt-2 line-clamp-1 text-lg/8 max-sm:text-base/7.25"
        />
        <div className="flex items-center justify-between">
          {isOutOfStock ? (
            <StockStatus
              stock={stock}
              className="text-error max-xs:text-sm mr-auto  text-lg/8 max-sm:text-base/7.25"
            />
          ) : (
            <>
              <AddToCartButton className="bg-neutral3 hover:bg-primary hover:*:text-WHITE flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors" />
              <PriceSection price={price} discount={discount} />
            </>
          )}
        </div>
      </div>
      {hasDiscount && !isOutOfStock && <DiscountBadge discount={discount} />}
    </div>
  );

  return (
    <div className="group border-neutral5 bg-WHITE relative flex h-full flex-col justify-between gap-y-2 justify-self-center overflow-hidden rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
      {isOutOfStock ? (
        <div className="cursor-default">{Content()}</div>
      ) : (
        <Link href={slug}>{Content()}</Link>
      )}
      {!isOutOfStock && (
        <LikeButton
          className="bg-bg-error absolute top-4 -left-9 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all group-hover:left-4 max-md:left-4!"
          mobileResponsive={false}
        />
      )}
    </div>
  );
}