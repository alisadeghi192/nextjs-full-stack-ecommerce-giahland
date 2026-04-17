"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { formatDimensions } from "@/lib/utils/formatDimensions";
import { formatPrice } from "@/lib/utils/formatPrice";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";

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

  const handleAddToCart = () => {
    alert("به سبد خرید اضافه شد");
  };

  return (
    <div className="border-neutral5 group relative overflow-hidden rounded-lg border">
      <Link href={slug}>
        <div className="flex gap-x-6 p-4 max-md:gap-x-3">
          <div className="overflow-hidden rounded-lg">
            <Image
              alt={name}
              src={image}
              width={120}
              height={120}
              className="aspect-square rounded-lg object-cover max-md:size-22.5"
            ></Image>
          </div>
          <div className="flex grow flex-col justify-between">
            <div className="flex flex-col gap-y-1">
              <p
                className={`${stock === 0 && "text-neutral9"} group-hover:text-primary color text-lg/8 transition max-md:text-base max-md:text-wrap`}
              >
                {name}
              </p>
              <p className="text-neutral9 text-sm/6.25">
                ابعاد: {formatDimensions(potDimensions)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              {stock === 0 ? (
                <span className="text-error mr-auto text-lg/8 max-md:text-base">ناموجود</span>
              ) : (
                <>
                  <div className="mr-auto flex flex-wrap items-center gap-x-2">
                    {discount > 0 && (
                      <span className="text-error relative mr-auto text-sm/6.25">
                        {formatPrice(price, false)}
                        <span className="bg-error absolute top-1/2 block h-px w-full"></span>
                      </span>
                    )}
                    <span className="mr-auto text-lg/8 max-md:text-base max-sm:text-base/7.25">
                      {formatPrice(finalPrice)}
                    </span>
                  </div>
                </>
              )}
            </div>
            {discount > 0 && (
              <span className="bg-bg-error text-error absolute top-5 right-5 rounded-xl px-1 text-xs/5.5 font-bold">
                {discount}%
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        className="bg-bg-error absolute top-4 -left-9 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all group-hover:left-4 max-md:top-2 max-md:left-2 max-md:size-7 max-md:group-hover:left-2"
        onClick={toggleLike}
      >
        {isLiked ? (
          <BsHeartFill className="text-error size-5 max-md:size-4" />
        ) : (
          <BsHeart className="text-neutral7 size-5 max-md:size-4" />
        )}
      </button>
      <button
        className="bg-neutral3 hover:bg-primary hover:*:text-WHITE absolute top-14 -left-9 flex size-8 shrink-0 items-center justify-center rounded-full transition-all group-hover:left-4 max-md:top-10 max-md:left-2 max-md:size-7 max-md:group-hover:left-2"
        onClick={handleAddToCart}
      >
        <MdOutlineShoppingCart className="text-BLACK size-5 justify-self-start transition-colors max-md:size-4" />
      </button>
    </div>
  );
}
