"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useState } from "react";
import { formatDimensions } from "@/lib/utils/formatDimensions";

export default function ProductCardGrid({
  name,
  price,
  image,
  slug = "/",
  discount,
  potDimensions,
  stock,
}: Product) {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const finalPrice = getDiscountedPrice(price, discount);
  return (
    <Link href={slug} className="group">
      <div className="relative border-neutral5 bg-WHITE flex max-w-72 flex-col justify-between gap-y-2 rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
        <Image
          alt={name}
          src={image}
          width={256}
          height={261}
          className="self-center object-cover aspect-square rounded-lg "
        />
        <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
          <div className="flex flex-col gap-y-1">
            <p className="text-BLACK line-clamp-1 text-lg/8 max-sm:text-base/7.25 group-hover:text-primary transition color">
              {name}
            </p>
            <p className="text-sm/6.25 text-neutral9">
              ابعاد: {formatDimensions(potDimensions)}
            </p>
          </div>

          <div className="flex items-center justify-end gap-x-2">
            {stock === 0 ? (
              <span className="text-error text-lg/8">ناموجود</span>
            ) : (
              <>
                {discount > 0 && (
                  <span className="relative text-sm/6.25 text-error">
                    {formatPrice(price, false)}
                    <span className="block absolute top-1/2 w-full h-px m-auto bg-error "></span>
                  </span>
                )}
                <span className="text-lg/8 max-sm:text-base/7.25">
                  {formatPrice(finalPrice)}
                </span>
              </>
            )}
          </div>
        </div>
        {discount > 0 && (
          <span className="font-bold text-xs/5.5 px-1 rounded-xl bg-bg-error absolute top-5 right-5 text-error">
            {discount}%
          </span>
        )}
      </div>
    </Link>
  );
}
