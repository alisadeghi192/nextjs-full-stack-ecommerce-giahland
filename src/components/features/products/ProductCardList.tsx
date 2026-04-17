"use client";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import LikeButton from "./LikeButton";
import AddToCartButton from "./AddToCartButton";
import PriceSection from "./PriceSection";
import ProductInfo from "./ProductInfo";
import StockStatus from "./StockStatus";
import DiscountBadge from "./DiscountBadge";
import ProductImage from "./ProductImage";

export default function ProductCardList({
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
    <div className="flex gap-x-6 p-4 max-md:gap-x-3">
      <ProductImage image={image} view="list" name={name} />
      <div className="flex grow flex-col justify-between">
        <ProductInfo
          name={name}
          potDimensions={potDimensions}
          stock={stock}
          nameClassName="text-lg/8 max-md:text-base max-md:text-wrap"
        />
        <div className="flex items-center justify-end">
          {isOutOfStock ? (
            <StockStatus
              stock={stock}
              className="text-error mr-auto text-lg/8 max-md:text-base"
            />
          ) : (
            <PriceSection price={price} discount={discount} />
          )}
        </div>
        {hasDiscount && <DiscountBadge discount={discount} />}
      </div>
    </div>
  );

  return (
    <div className="border-neutral5 group relative overflow-hidden rounded-lg border">
      {isOutOfStock ? (
        <div className="cursor-default">{Content()}</div>
      ) : (
        <Link href={slug}>{Content()}</Link>
      )}
      <LikeButton
        mobileResponsive={true}
        className="bg-bg-error absolute top-4 -left-9 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all group-hover:left-4 max-md:top-2 max-md:left-2 max-md:size-7 max-md:group-hover:left-2"
      />
      <AddToCartButton className="bg-neutral3 hover:bg-primary hover:*:text-WHITE absolute top-14 -left-9 flex size-8 shrink-0 items-center justify-center rounded-full transition-all group-hover:left-4 max-md:top-10 max-md:left-2 max-md:size-7 max-md:group-hover:left-2" />
    </div>
  );
}