"use client";
import React, { useState } from "react";
import { toPersianNumber } from "@/lib/utils/format";
import { IoClose } from "react-icons/io5";
import PriceSection from "@/components/features/products/PriceSection";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import CartModalItem from "./CartModalItem";

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

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const [count, setCount] = useState<number>(2);
  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);
  const reset = () => setCount(0);

  const items = [
    { id: 1, name: productName, image: "/static/images/blog-covers/plant8.png", dimensions, price, discount, quantity: count },
    { id: 2, name: productName, image: "/static/images/blog-covers/plant8.png", dimensions, price, discount, quantity: count },
    { id: 3, name: productName, image: "/static/images/blog-covers/plant8.png", dimensions, price, discount, quantity: count },
  ];

  return (
    <div className="border-neutral3 rounded-xl border bg-white p-3 pr-1.5" onClick={(e) => e.stopPropagation()}>
      <div className="mr-1.5 mb-2 flex w-115 items-center justify-between">
        <div className="flex gap-x-1 leading-7.25 font-medium">
          <span>سبد خرید</span>
          <span className="text-neutral8">({toPersianNumber(numberOfProducts)} کالا)</span>
        </div>
        <IoClose className="size-5 cursor-pointer" onClick={onClose} />
      </div>

      <div className="custom-scroll ltr flex max-h-68.75 flex-col space-y-2 overflow-y-auto">
        {items.map((item) => (
          <CartModalItem
            key={item.id}
            productName={item.name}
            imageSrc={item.image}
            dimensions={item.dimensions}
            price={item.price}
            discount={item.discount}
            quantity={item.quantity}
            onIncrease={increase}
            onDecrease={decrease}
            onRemove={reset}
          />
        ))}
      </div>

      <div className="mt-4 mr-1.5 space-y-2">
        <div className="flex items-center justify-between gap-x-3 gap-y-2">
          <span className="text-neutral9 leading-7.25 font-medium">جمع مبلغ:</span>
          <PriceSection discount={0} price={finalPrice} variant="product-card" />
        </div>
        <PrimaryButton className="mt-2 w-full py-2 text-lg">ثبت سفارش</PrimaryButton>
      </div>
    </div>
  );
}