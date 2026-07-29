"use client";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { useIsAuthenticated, useUserRole } from "@/features/auth/selectors/auth.selectors";
import { useCartStoreActions } from "@/features/cart/selectors/cart.selectors";
import toast from "react-hot-toast";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { MdOutlineChangeCircle } from "react-icons/md";
import PriceSection from "./PriceSection";
import StockStatus from "./StockStatus";

interface ProductPurchaseCardProps {
  productId : string
  price: number;
  discount: number;
  stock: number;
}

export default function ProductPurchaseCard({
  productId,
  price,
  discount,
  stock,
}: ProductPurchaseCardProps) {
  const isOutOfStock = stock === 0;
  const userRole = useUserRole();
  const hidePrice = userRole === "plant-doctor" || userRole ==="admin";
  const isAuthenticated = useIsAuthenticated()
  const { addItem } = useCartStoreActions();
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

  return (
    <div className="border-neutral7 dark:border-neutral10 dark:shadow-shade3 shadow-lg w-78 rounded-2xl border px-6 py-7.75 max-xl:mt-9 max-sm:mt-8 max-sm:w-full max-sm:self-center">
      <div className="space-y-2">
        <div className="bg-neutral3 dark:bg-shade4 transition-colors flex items-center gap-x-3 rounded-xl p-3">
          <MdOutlineChangeCircle className="text-shade1 dark:text-primary-dark size-7.5" />
          <span className="text-neutral9 dark:text-text-dark text-sm/6 font-medium">
            ۷ روز ضمانت بازگشت کالا
          </span>
        </div>
        <div className="bg-neutral3 dark:bg-shade4 transition-colors flex items-center gap-x-3 rounded-xl p-3">
          <BiSupport className="text-shade1 dark:text-primary-dark size-7.5" />
          <span className="text-neutral9 dark:text-text-dark text-sm/6 font-medium">
            پشتیبانی ۲۴ ساعته
          </span>
        </div>
        <div className="bg-neutral3 dark:bg-shade4 transition-colors flex items-center gap-x-3 rounded-xl p-3">
          <AiOutlineDollarCircle className="text-shade1 dark:text-primary-dark size-7.5" />
          <span className="text-neutral9 dark:text-text-dark text-sm/6 font-medium">
            ضمانت بهترین قیمت
          </span>
        </div>
      </div>

      {isOutOfStock && !hidePrice ? (
        <StockStatus
          stock={stock}
          className="text-error block py-6 text-lg font-medium max-sm:hidden"
        />
      ) : (
        <PriceSection
          price={price}
          discount={discount}
          variant="purchase-card"
        />
      )}

      <PrimaryButton
        onClick={handleAddToCart}
        className={`h-12 w-full text-lg/8 max-sm:hidden ${hidePrice ? "hidden" : "visible"}`}
        disabled={isOutOfStock}
      >
        افزودن به سبد خرید
      </PrimaryButton>
    </div>
  );
}
