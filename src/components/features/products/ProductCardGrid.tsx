"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/features/products/types/product.types";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";
import { formatPrice } from "@/lib/utils/formatPrice";
import { useState } from "react";
import { formatDimensions } from "@/lib/utils/formatDimensions";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert("به سبد خرید اضافه شد");
  };

  return (
    <div className="group border-neutral5 bg-WHITE relative flex h-full flex-col justify-between gap-y-2 justify-self-center overflow-hidden rounded-xl border p-4 max-xl:gap-y-4 max-sm:max-w-57">
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
              className={` ${stock === 0 && "text-neutral9"} group-hover:text-primary color max-xs:text-sm mt-2 line-clamp-1 text-lg/8 transition max-sm:text-base/7.25`}
            >
              {name}
            </p>
            <p className="text-neutral9 text-sm/6.25">
              ابعاد: {formatDimensions(potDimensions)}
            </p>
          </div>

          <div className="flex items-center justify-between">
            {stock === 0 ? (
              <span className="text-error max-xs:text-sm mr-auto text-lg/8 max-sm:text-base/7.25">
                ناموجود
              </span>
            ) : (
              <>
                <button
                  className="bg-neutral3 hover:bg-primary cursor-pointer hover:*:text-WHITE flex size-8 shrink-0 items-center justify-center rounded-full transition-colors"
                  onClick={handleAddToCart}
                >
                  <MdOutlineShoppingCart className="text-BLACK size-5 justify-self-start transition-colors" />
                </button>
                <div className="flex flex-wrap items-center justify-center gap-x-2">
                  {discount > 0 && (
                    <span className="text-error relative mr-auto text-sm/6.25">
                      {formatPrice(price, false)}
                      <span className="bg-error absolute top-1/2 mr-0-auto block h-px w-full"></span>
                    </span>
                  )}
                  <span className="mr-auto text-lg/8 max-sm:text-base/7.25">
                    {formatPrice(finalPrice)}
                  </span>
                </div>
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
        className="bg-bg-error absolute top-4 -left-9 flex size-8 cursor-pointer items-center justify-center rounded-full transition-all group-hover:left-4 max-md:left-4!"
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
