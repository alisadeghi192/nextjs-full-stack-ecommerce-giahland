"use client";
import PriceSection from "@/components/features/products/PriceSection";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";

interface CartStickyPriceProps {
  price: number;
  buttonText: string;
  isEnable?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  variant: "cart" | "checkout";
}

export default function CartStickyPrice({
  price,
  buttonText,
  isEnable,
  isLoading,
  onClick,
  variant,
}: CartStickyPriceProps) {
  if (variant === "cart") {
    return (
      <div className="border-neutral4 max-xs:gap-x-8 max-xs:justify-between fixed right-0 bottom-0 left-0 z-40 flex h-20 translate-y-0 items-center justify-center gap-x-15 border-t bg-white px-4 opacity-100 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 sm:hidden">
        <PrimaryButton
          href="/checkout"
          className="px-4.5 py-2 text-lg/8 max-[400px]:px-2.5 max-[400px]:text-base!"
        >
          {buttonText}
        </PrimaryButton>
        <PriceSection price={price} discount={0} variant="sticky-footer" />
      </div>
    );
  }
  if (variant === "checkout") {
    return (
      <div className="border-neutral4 max-xs:gap-x-8 max-xs:justify-between fixed right-0 bottom-0 left-0 z-40 flex h-20 translate-y-0 items-center justify-center gap-x-15 border-t bg-white px-4 opacity-100 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 sm:hidden">
        <PrimaryButton
          onClick={onClick}
          disabled={!isEnable || isLoading}
          className="px-4.5 py-2 text-lg/8 max-[400px]:px-2.5 max-[400px]:text-base!"
        >
          {buttonText}
        </PrimaryButton>
        <PriceSection price={price} discount={0} variant="sticky-footer" />
      </div>
    );
  }
}
