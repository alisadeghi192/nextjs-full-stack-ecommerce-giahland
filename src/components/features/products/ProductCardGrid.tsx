"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useState } from "react";
import { formatDimensions } from "@/lib/utils/formatDimensions";
import { BsHeart, BsHeartFill } from "react-icons/bs";

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
  const toggleLike = () => {
    setIsLiked(!isLiked);
  };
  const finalPrice = getDiscountedPrice(price, discount);
  return (
    <div className="group border-neutral5 bg-WHITE relative flex max-w-72 flex-col justify-between gap-y-2 overflow-hidden rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
      <Link href={slug}>
        <Image
          alt={name}
          src={image}
          width={256}
          height={261}
          className="aspect-square self-center rounded-lg object-cover"
        />
        <div className="flex flex-col gap-y-4 max-sm:gap-y-2">
          <div className="flex flex-col gap-y-1">
            <p
              className={` ${stock === 0 && "text-neutral9"} group-hover:text-primary color line-clamp-1 text-lg/8 transition max-sm:text-base/7.25`}
            >
              {name}
            </p>
            <p className="text-neutral9 text-sm/6.25">
              ابعاد: {formatDimensions(potDimensions)}
            </p>
          </div>

          <div className="flex items-center justify-end gap-x-2">
            {stock === 0 ? (
              <span className="text-error text-lg/8">ناموجود</span>
            ) : (
              <>
                {discount > 0 && (
                  <span className="text-error relative text-sm/6.25">
                    {formatPrice(price, false)}
                    <span className="bg-error absolute top-1/2 m-auto block h-px w-full"></span>
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
          <span className="bg-bg-error text-error absolute top-5 right-5 rounded-xl px-1 text-xs/5.5 font-bold">
            {discount}%
          </span>
        )}
      </Link>
      <button
        className="bg-bg-error absolute top-4 -left-9 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all group-hover:left-4"
        onClick={toggleLike}
      >
        {isLiked ? (
          <BsHeartFill className="text-error size-5" />
        ) : (
          <BsHeart className="text-neutral7 size-5" />
        )}
      </button>
    </div>
  );
}
