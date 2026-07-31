"use client";

import { useCartStoreActions } from "@/features/cart/selectors/cart.selectors";
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

interface CartPageItemProps {
  item: any;
}

export default function CartPageItem({ item }: CartPageItemProps) {
  const { updateQuantity, removeItem } = useCartStoreActions();
  const product = item.product as any;
  const totalPrice = toPersianPrice(
    getDiscountedPrice(product.price, product.discount || 0) * item.quantity,
  );

  const handleIncrease = () => {
    updateQuantity(product._id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(product._id, item.quantity - 1);
    } else {
      removeItem(product._id);
    }
  };


  return (
    <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 flex gap-x-4 rounded-xl border p-4 shadow-lg">
      <div className="relative size-25 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="size-full object-cover"
        />
        <DiscountBadge discount={product.discount} className="absolute top-0" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <Link
          href={`/products/${product.category}/${product.slug}`}
          className="hover:text-primary dark:hover:text-primary-dark text-lg/8 max-md:text-base font-medium transition-colors"
        >
          {product.name}
        </Link>
        {product.potDimensions && (
          <p className="text-neutral9 dark:text-text-dark text-sm/6.25 line-clamp-1">
            {toStyledSlug(product.slug)}
          </p>
        )}

        <div className="flex items-center justify-between  sm:mt-0 max-xs:flex-col-reverse max-xl:items-end max-xs:gap-y-2">
          <div className="flex items-center gap-x-4 max-sm:gap-x-2">
            <button
              onClick={handleIncrease}
              className="border-primary dark:border-primary-dark text-primary dark:text-primary-dark hover:text-shade2 dark:hover:text-primary hover:border-shade2 dark:hover:border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border transition-colors"
            >
              <FaPlus className="size-4" />
            </button>
            <span className="text-primary dark:text-primary-dark tex text-center font-medium">
              {toPersianNumber(item.quantity)}
            </span>
            <button
              onClick={handleDecrease}
              className="border-primary dark:border-primary-dark text-primary dark:text-primary-dark hover:text-shade2 dark:hover:text-primary hover:border-shade2 dark:hover:border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border transition-colors"
            >
              {item.quantity === 1 ? (
                <AiOutlineDelete className="size-4.5" />
              ) : (
                <FaMinus className="size-4" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-x-2">
            <div className="text-error relative text-sm">
              {product.discount > 0 &&
                toPersianPrice(product.price * item.quantity, false)}
              <span className="bg-error mr-0-auto absolute top-1/2 block h-px w-full"></span>
            </div>
            <div className="text-lg max-md:text-base font-medium">{totalPrice}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
