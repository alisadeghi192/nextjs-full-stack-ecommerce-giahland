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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    alert("به سبد خرید اضافه شد");
  };

  return (
    <div className="border-neutral5 group relative overflow-hidden rounded-lg border">
      <Link href={slug}>
        <div className="flex gap-x-6 p-4">
          <div className="overflow-hidden rounded-lg">
            <Image
              alt={name}
              src={image}
              width={120}
              height={120}
              className="aspect-square rounded-lg object-cover"
            ></Image>
          </div>
          <div className="flex grow flex-col justify-between">
            <div className="flex flex-col gap-y-1">
              <p
                className={`${stock === 0 && "text-neutral9"} group-hover:text-primary color text-lg/8 transition`}
              >
                {name}
              </p>
              <p className="text-neutral9 text-sm/6.25">
                ابعاد: {formatDimensions(potDimensions)}
              </p>
            </div>
            <div className="flex items-center justify-between">
              {stock === 0 ? (
                <span className="text-error text-lg/8 mr-auto">ناموجود</span>
              ) : (
                <>
                  <div className="bg-neutral3 hover:bg-primary hover:*:text-WHITE flex size-8 items-center justify-center rounded-full transition-colors" onClick={handleAddToCart}>
                    <MdOutlineShoppingCart
                      className="text-BLACK size-5 justify-self-start transition-colors"
                      onClick={handleAddToCart}
                    />
                  </div>
                  <div className="flex items-center justify-center gap-x-2">
                    {discount > 0 && (
                      <span className="text-error relative text-sm/6.25">
                        {formatPrice(price, false)}
                        <span className="bg-error absolute top-1/2 m-auto block h-px w-full"></span>
                      </span>
                    )}
                    <span className="text-lg/8 max-sm:text-base/7.25">
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
