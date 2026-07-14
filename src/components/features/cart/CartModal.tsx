"use client";

import PriceSection from "@/components/features/products/PriceSection";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { useIsAuthenticated } from "@/features/auth/selectors/auth.selectors";
import { toPersianNumber } from "@/lib/utils/format";
import {
  useCartStoreActions,
  useCartSummary,
} from "@/stores/selectors/cart.selectors";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import CartModalItem from "./CartModalItem";

interface CartModalProps {
  onClose: () => void;
}

export default function CartModal({ onClose }: CartModalProps) {
  const { fetchCart, updateQuantity, removeItem } = useCartStoreActions();
  const { items, totalItems, totalPrice } = useCartSummary();
  const isAuthenticated = useIsAuthenticated();
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const handleIncrease = (productId: string) => {
    const existingItem = items.find(
      (item) => (item.product as any)?._id === productId,
    );
    if (existingItem) {
      const newQuantity = existingItem.quantity + 1;
      updateQuantity(productId, newQuantity);
    }
  };

  const handleDecrease = (productId: string) => {
    const existingItem = items.find(
      (item) => (item.product as any)?._id === productId,
    );
    if (existingItem && existingItem.quantity > 1) {
      updateQuantity(productId, existingItem.quantity - 1);
    }
  };

  const handleRemove = (productId: string) => {
    removeItem(productId);
  };

  return (
    <div className="border-neutral3 w-115 rounded-xl border bg-white p-3 pr-1.5 shadow-lg max-md:w-full">
      <div className="mr-1.5 mb-2 flex items-center justify-between">
        <div className="flex gap-x-1 leading-7.25 font-medium">
          <span>سبد خرید</span>
          {items.length > 0 && (
            <span className="text-neutral8">
              ({toPersianNumber(totalItems)} کالا)
            </span>
          )}
        </div>
        <IoClose className="size-5 cursor-pointer" onClick={onClose} />
      </div>

      {items.length > 0 ? (
        <div>
          <div className="custom-scroll ltr flex max-h-80 flex-col space-y-2 overflow-y-auto max-md:max-h-80">
            {items?.map((item) => (
              <CartModalItem
                key={(item.product as any)._id}
                item={item as any}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
            ))}
          </div>

          <div className="mt-4 mr-1.5 space-y-2">
            <div className="flex items-center justify-between gap-x-3 gap-y-2">
              <span className="text-neutral9 leading-7.25 font-medium">
                جمع مبلغ:
              </span>
              <PriceSection
                discount={0}
                price={totalPrice}
                variant="product-card"
                bold
              />
            </div>
            <PrimaryButton className="mt-2 w-full py-2 text-lg" href="/cart">
              ثبت سفارش
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-9 mr-0.75">
            <div className="mx-auto mb-3 w-fit">
              <Image
                alt="empty-cart"
                src={"/static/images/empty-cart.webp"}
                width={124}
                height={76}
              />
            </div>
            <div className="flex flex-col gap-y-1 text-center">
              <span className="text-sm/6.25">سبد خرید شما خالی است!</span>
              <span className="text-neutral9 text-[13px]/5.75">
                برای مشاهده محصولات به فروشگاه مراجعه کنید.
              </span>
            </div>
          </div>
          <div onClick={onClose}>
            <PrimaryButton
              className="mr-0.75 h-12 w-full text-lg"
              href="/products"
            >
              مشاهده محصولات
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}
