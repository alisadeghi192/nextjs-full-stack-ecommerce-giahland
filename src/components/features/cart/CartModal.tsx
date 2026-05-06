import React, { useState } from "react";
import {
  formatDimensions,
  formatPrice,
  toPersianNumber,
} from "@/lib/utils/format";
import { IoClose } from "react-icons/io5";
import PriceSection from "@/components/features/products/PriceSection";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import Image from "next/image";
import { FaMinus, FaPlus, FaTrashCan } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { getDiscountedPrice } from "@/features/products/utils/productHelpers";
const numberOfProducts = 2;
const finalPrice = 4250000;
const productName = "بابا آدم";
const dimensions = {
  length: 25,
  width: 25,
  height: 50,
};
const price = 1850000;
const discount = 25;

const discountedPrice = formatPrice(getDiscountedPrice(price, discount));


interface CartModalProps {
  onClose: () => void;
}


export default function CartModal({ onClose }: CartModalProps) {
  const [count, setCount] = useState<number>(2);
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };
  const reset = () => {
    setCount(0);
  };
  return (
    <div className="border-neutral3  rounded-xl border bg-white p-3 pr-1.5  " onClick={(e) => e.stopPropagation()}>
      {/* header */}
      <div className="mr-1.5 mb-2 flex w-115 items-center justify-between">
        <div className="flex gap-x-1 leading-7.25 font-medium">
          <span>سبد خرید</span>
          <span className="text-neutral8">
            ({toPersianNumber(numberOfProducts)} کالا)
          </span>
        </div>
        <IoClose className="size-5 cursor-pointer" onClick={onClose}/>
      </div>
      {/* items */}
      <div className="custom-scroll ltr flex max-h-68.75 flex-col space-y-2 overflow-y-auto">
        {/* item */}
        <div className="bg-neutral2 rtl border-neutral5 mr-1.5 flex gap-x-6 rounded-xl border p-4">
          {/* image */}
          <div className="size-25 shrink-0 overflow-hidden rounded-lg">
            <Image
              alt="alt"
              src={"/static/images/blog-covers/plant8.png"}
              width={100}
              height={100}
              className="size-25 rounded-lg object-cover object-center"
            ></Image>
          </div>
          {/* details */}
          <div className="w-full space-y-1.75">
            {/* features */}
            <div className="flex flex-col gap-y-1">
              <span className="text-lg/8">{productName} </span>
              <span className="text-neutral9 text-sm/6.25">
                ابعاد: {formatDimensions(dimensions)}
              </span>
            </div>
            {/* count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors">
                  <FaPlus className="size-4 text-inherit" onClick={increase} />
                </button>
                <span className="text-primary inline-flex h-6 w-5 items-center justify-center text-[13px]/6 font-bold">
                  {toPersianNumber(count)}
                </span>
                <button className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors">
                  {count === 1 ? (
                    <AiOutlineDelete
                      className="size-4 text-inherit"
                      onClick={reset}
                    />
                  ) : (
                    <FaMinus
                      className="size-4 text-inherit"
                      onClick={decrease}
                    />
                  )}
                </button>
              </div>
              <div>{discountedPrice}</div>
            </div>
          </div>
        </div>
        <div className="bg-neutral2 rtl border-neutral5 mr-1.5 flex gap-x-6 rounded-xl border p-4">
          {/* image */}
          <div className="size-25 shrink-0 overflow-hidden rounded-lg">
            <Image
              alt="alt"
              src={"/static/images/blog-covers/plant8.png"}
              width={100}
              height={100}
              className="size-25 rounded-lg object-cover object-center"
            ></Image>
          </div>
          {/* details */}
          <div className="w-full space-y-1.75">
            {/* features */}
            <div className="flex flex-col gap-y-1">
              <span className="text-lg/8">{productName} </span>
              <span className="text-neutral9 text-sm/6.25">
                ابعاد: {formatDimensions(dimensions)}
              </span>
            </div>
            {/* count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors">
                  <FaPlus className="size-4 text-inherit" onClick={increase} />
                </button>
                <span className="text-primary inline-flex h-6 w-5 items-center justify-center text-[13px]/6 font-bold">
                  {toPersianNumber(count)}
                </span>
                <button className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors">
                  {count === 1 ? (
                    <AiOutlineDelete
                      className="size-4 text-inherit"
                      onClick={reset}
                    />
                  ) : (
                    <FaMinus
                      className="size-4 text-inherit"
                      onClick={decrease}
                    />
                  )}
                </button>
              </div>
              <div>{discountedPrice}</div>
            </div>
          </div>
        </div>
        <div className="bg-neutral2 rtl border-neutral5 mr-1.5 flex gap-x-6 rounded-xl border p-4">
          {/* image */}
          <div className="size-25 shrink-0 overflow-hidden rounded-lg">
            <Image
              alt="alt"
              src={"/static/images/blog-covers/plant8.png"}
              width={100}
              height={100}
              className="size-25 rounded-lg object-cover object-center"
            ></Image>
          </div>
          {/* details */}
          <div className="w-full space-y-1.75">
            {/* features */}
            <div className="flex flex-col gap-y-1">
              <span className="text-lg/8">{productName} </span>
              <span className="text-neutral9 text-sm/6.25">
                ابعاد: {formatDimensions(dimensions)}
              </span>
            </div>
            {/* count */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors">
                  <FaPlus className="size-4 text-inherit" onClick={increase} />
                </button>
                <span className="text-primary inline-flex h-6 w-5 items-center justify-center text-[13px]/6 font-bold">
                  {toPersianNumber(count)}
                </span>
                <button className="text-primary hover:text-shade2 hover:border-shade2 border-primary flex size-6 cursor-pointer items-center justify-center rounded-sm border bg-white transition-colors">
                  {count === 1 ? (
                    <AiOutlineDelete
                      className="size-4 text-inherit"
                      onClick={reset}
                    />
                  ) : (
                    <FaMinus
                      className="size-4 text-inherit"
                      onClick={decrease}
                    />
                  )}
                </button>
              </div>
              <div>{discountedPrice}</div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="mt-4 mr-1.5 space-y-2">
        <div className="flex items-center justify-between gap-x-3 gap-y-2">
          <span className="text-neutral9 leading-7.25 font-medium">
            جمع مبلغ:
          </span>
          <PriceSection
            discount={0}
            price={finalPrice}
            variant="product-card"
          />
        </div>
        <PrimaryButton className="mt-2 w-full py-2 text-lg">
          ثبت سفارش
        </PrimaryButton>
      </div>
    </div>
  );
}
