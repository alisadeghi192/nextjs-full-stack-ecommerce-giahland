"use client";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { toPersianNumber, formatDimensions, formatPrice } from "@/lib/utils/format";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";

interface CartModalItemProps {
  productName: string;
  imageSrc: string;
  dimensions: { length: number; width: number; height: number };
  price: number;
  discount: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartModalItem({
  productName,
  imageSrc,
  dimensions,
  price,
  discount,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartModalItemProps) {
  const discountedPrice = formatPrice(getDiscountedPrice(price, discount));

  return (
    <div className="bg-neutral2 rtl border-neutral5 mr-1.5 flex gap-x-6 rounded-xl border p-4">
      <div className="size-25 shrink-0 overflow-hidden rounded-lg">
        <Image
          alt={productName}
          src={imageSrc}
          width={100}
          height={100}
          className="size-25 rounded-lg object-cover object-center"
        />
      </div>
      <div className="w-full space-y-1.75">
        <div className="flex flex-col gap-y-1">
          <span className="text-lg/8">{productName}</span>
          <span className="text-neutral9 text-sm/6.25">
            ابعاد: {formatDimensions(dimensions)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onIncrease}
              className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors"
            >
              <FaPlus className="size-4 text-inherit" />
            </button>
            <span className="text-primary inline-flex h-6 w-5 items-center justify-center text-[13px]/6 font-bold">
              {toPersianNumber(quantity)}
            </span>
            <button
              onClick={onDecrease}
              className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors"
            >
              {quantity === 1 ? (
                <AiOutlineDelete className="size-4 text-inherit" />
              ) : (
                <FaMinus className="size-4 text-inherit" />
              )}
            </button>
          </div>
          <div>{discountedPrice}</div>
        </div>
      </div>
    </div>
  );
}