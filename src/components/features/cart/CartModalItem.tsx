"use client";
import { ICartItem } from "@/features/cart/types/cart.types";
import {
  toPersianNumber,
  toPersianPrice,
  toStyledSlug
} from "@/lib/utils/format";
import { getDiscountedPrice } from "@/lib/utils/price";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";
import DiscountBadge from "../products/DiscountBadge";

interface CartModalItemProps {
  item: ICartItem & {
    product?: {
      _id: string;
      name: string;
      price: number;
      image: string;
      discount?: number;
      slug: string;
      category: string;
    };
  };
  onIncrease: (productId: string) => void;
  onDecrease: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function CartModalItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartModalItemProps) {
  const product = item.product;
  if (!product || typeof product === "string") {
    return null;
  }

  const productId = product._id;
  const price = product.price || 0;
  const discount = product.discount || 0;
  const discountedPrice = toPersianPrice(getDiscountedPrice(price, discount));

  return (
    <div className="bg-neutral2 dark:bg-shade2 rtl border-neutral5 dark:border-neutral10 mr-1.5 flex gap-x-6 rounded-xl border p-4">
      <div className="relative size-25 shrink-0 self-center overflow-hidden rounded-lg">
        <Image
          alt={product.name}
          src={product.image}
          width={100}
          height={100}
          className="size-25 rounded-lg object-cover object-center"
        />
        <DiscountBadge
          discount={discount}
          className="absolute top-0 size-fit px-0.5 text-[10px]"
        />
      </div>
      <div className="flex w-full flex-col gap-y-2 max-md:justify-between">
        <div className="flex flex-col gap-y-1">
          <Link
            href={`/products/${product.category}/${product.slug}`}
            className="max-xs:text-base text-lg/8"
          >
            {product.name}
          </Link>
          {product.slug && (
            <span className="text-neutral9 dark:text-text-dark line-clamp-1 text-sm/6.25">
            {toStyledSlug(product.slug)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-y-2 max-md:flex-wrap-reverse">
          <div className="flex items-center max-md:mr-auto">
            <button
              onClick={() => onIncrease(productId)}
              className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white dark:bg-primary dark:border-white dark:text-white dark:hover:text-text-dark dark:hover:border-primary-dark transition-colors"
            >
              <FaPlus className="size-4 text-inherit" />
            </button>
            <span className="text-primary dark:text-text-dark inline-flex h-6 w-5 items-center justify-center text-[13px]/6 font-bold">
              {toPersianNumber(item.quantity)}
            </span>
            <button
              onClick={() => {
                if (item.quantity === 1) {
                  onRemove(productId); 
                } else {
                  onDecrease(productId);
                }
              }}
              className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white dark:bg-primary dark:border-white dark:text-white dark:hover:text-text-dark dark:hover:border-primary-dark transition-colors"
            >
              {item.quantity === 1 ? (
                <AiOutlineDelete className="size-4 text-inherit" />
              ) : (
                <FaMinus className="size-4 text-inherit" />
              )}
            </button>
          </div>
          <div className="max-md:mr-auto">{discountedPrice}</div>
        </div>
      </div>
    </div>
  );
}
