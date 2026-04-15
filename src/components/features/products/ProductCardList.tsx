"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { formatDimensions } from "@/lib/utils/formatDimensions";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

export default function ProductCardList({
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
    <div className="border relative border-neutral5 rounded-lg group overflow-hidden">
      <Link href={slug}>
        <div className=" p-4 flex gap-x-6">
          <div className="rounded-lg overflow-hidden">
            <Image
              alt={name}
              src={image}
              width={120}
              height={120}
              className="object-cover aspect-square rounded-lg"
            ></Image>
          </div>
          <div className="grow justify-between flex flex-col">
            <div className="flex flex-col gap-y-1">
              <p
                className={`${stock === 0 && "text-neutral9"} text-lg/8 group-hover:text-primary transition color`}
              >
                {name}
              </p>
              <p className="text-sm/6.25 text-neutral9">
                ابعاد: {formatDimensions(potDimensions)}
              </p>
            </div>
            <div className="flex justify-end items-center gap-x-2">
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
            {discount > 0 && (
              <span className="font-bold text-xs/5.5 px-1 rounded-xl bg-bg-error absolute top-5 right-5 text-error">
                {discount}%
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        className="absolute cursor-pointer top-4 -left-9 group-hover:left-4 size-8 rounded-full bg-bg-error flex items-center justify-center transition-all"
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
