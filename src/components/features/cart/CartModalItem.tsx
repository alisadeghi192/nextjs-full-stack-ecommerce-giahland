"use client";
import { ICartItem } from "@/features/cart/types/cart.types";
import {
  formatDimensions,
  formatPrice,
  toPersianNumber,
} from "@/lib/utils/format";
import { getDiscountedPrice } from "@/lib/utils/price";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineDelete } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa6";

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
      potDimensions?: {
        length: number;
        width: number;
        height: number;
      };
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
  const discountedPrice = formatPrice(getDiscountedPrice(price, discount));

  return (
    <div className="bg-neutral2 rtl border-neutral5 mr-1.5 flex gap-x-6 rounded-xl border p-4">
      <div className="size-25 shrink-0 self-center overflow-hidden rounded-lg">
        <Image
          alt={product.name}
          src={product.image}
          width={100}
          height={100}
          className="size-25 rounded-lg object-cover object-center"
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
          {product.potDimensions && (
            <span className="text-neutral9 text-sm/6.25">
              ابعاد: {formatDimensions(product.potDimensions)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-y-2 max-md:flex-wrap-reverse">
          <div className="flex items-center max-md:mr-auto">
            <button
              onClick={() => onIncrease(productId)}
              className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors"
            >
              <FaPlus className="size-4 text-inherit" />
            </button>
            <span className="text-primary inline-flex h-6 w-5 items-center justify-center text-[13px]/6 font-bold">
              {toPersianNumber(item.quantity)}
            </span>
            <button
              onClick={() => onDecrease(productId)}
              className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors"
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
