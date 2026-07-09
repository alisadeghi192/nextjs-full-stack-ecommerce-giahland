"use client";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { useUserRole } from "@/features/auth/selectors/auth.selectors";
import { useFooterVisibility } from "@/lib/hooks/useFooterVisibility";
import PriceSection from "./PriceSection";
import StockStatus from "./StockStatus";

interface MobileStickyCartProps {
  price: number;
  discount: number;
  onAddToCart?: () => void;
  stock: number;
}

export default function MobileStickyCart({
  price,
  discount,
  onAddToCart,
  stock,
}: MobileStickyCartProps) {
  const isFooterVisible = useFooterVisibility();
  const isOutOfStock = stock === 0;
    const userRole = useUserRole();
  const isDoctor = userRole === "plant-doctor";
  const isAdmin = userRole === "admin"
  
  if (isDoctor || isAdmin) {
    return null;
  }
  return (
    <>
      <div
        className={`shadow-top border-neutral4 max-xs:gap-x-8 max-xs:justify-between fixed right-0 bottom-0 left-0 z-40 flex h-20 items-center justify-center gap-x-15 border-t bg-white px-4 transition-all duration-300 sm:hidden ${isFooterVisible ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <PrimaryButton
          onClick={onAddToCart}
          className="px-4.5 py-2 text-lg/8 max-[400px]:px-2.5 max-[400px]:text-base!"
          disabled={isOutOfStock}
        >
          افزودن به سبد خرید
        </PrimaryButton>
        {isOutOfStock ? (
          <StockStatus
            stock={stock}
            className="text-error block text-xl font-medium "
          />
        ) : (
          <PriceSection
            price={price}
            discount={discount}
            variant="sticky-footer"
          />
        )}
      </div>
    </>
  );
}
