"use client";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import {
    useIsAuthenticated,
    useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import { useCartStoreActions } from "@/features/cart/selectors/cart.selectors";
import { useFooterVisibility } from "@/lib/hooks/useFooterVisibility";
import toast from "react-hot-toast";
import PriceSection from "./PriceSection";
import StockStatus from "./StockStatus";

interface MobileStickyCartProps {
  productId: string;
  price: number;
  discount: number;
  stock: number;
}

export default function MobileStickyCart({
  productId,
  price,
  discount,
  stock,
}: MobileStickyCartProps) {
  const isFooterVisible = useFooterVisibility();
  const isOutOfStock = stock === 0;
  const userRole = useUserRole();
  const isDoctor = userRole === "plant-doctor";
  const isAdmin = userRole === "admin";
  const { addItem } = useCartStoreActions();
  const isAuthenticated = useIsAuthenticated();
  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("لطفاً ابتدا ثبت‌نام یا لاگین کنید.");
      return;
    }

    if (isOutOfStock) {
      toast.error("این محصول موجود نیست.");
      return;
    }

    await addItem(productId, 1);
  };

  if (isDoctor || isAdmin) {
    return null;
  }
  return (
    <>
      <div
        className={`border-neutral4 dark:border-primary dark:shadow-shade6 max-xs:gap-x-8 max-xs:justify-between fixed right-0 bottom-0 left-0 z-40 flex h-20 items-center justify-center gap-x-15 border-t bg-white dark:bg-shade4 px-4 shadow-[0_-25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 sm:hidden ${isFooterVisible ? "pointer-events-none translate-y-full opacity-0" : "translate-y-0 opacity-100"}`}
      >
        <PrimaryButton
          onClick={handleAddToCart}
          className="px-4.5 py-2 text-lg/8 max-[400px]:px-2.5 max-[400px]:text-base!"
          disabled={isOutOfStock}
        >
          افزودن به سبد خرید
        </PrimaryButton>
        {isOutOfStock ? (
          <StockStatus
            stock={stock}
            className="text-error block text-xl font-medium"
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
