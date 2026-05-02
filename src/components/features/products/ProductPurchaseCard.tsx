"use client";
import { MdOutlineChangeCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import PriceSection from "./PriceSection";

interface ProductPurchaseCardProps {
  price: number;
  discount: number;
  onAddToCart?: () => void;
}

export default function ProductPurchaseCard({
  price,
  onAddToCart,
  discount,
}: ProductPurchaseCardProps) {



  return (
    <div className="border-neutral7 max-sm:w-full w-78 rounded-2xl border px-6 py-7.75 max-xl:mt-9 max-sm:mt-8 max-sm:self-center">
      <div className="space-y-2">
        <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
          <MdOutlineChangeCircle className="text-shade1 size-7.5" />
          <span className="text-neutral9 text-sm/6 font-medium">
            7 روز ضمانت بازگشت کالا
          </span>
        </div>
        <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
          <BiSupport className="text-shade1 size-7.5" />
          <span className="text-neutral9 text-sm/6 font-medium">
            پشتیبانی 24 ساعته
          </span>
        </div>
        <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
          <AiOutlineDollarCircle className="text-shade1 size-7.5" />
          <span className="text-neutral9 text-sm/6 font-medium">
            ضمانت بهترین قیمت
          </span>
        </div>
      </div>

      <PriceSection price={price} discount={discount} variant="purchase-card"/>

      <PrimaryButton onClick={onAddToCart} className="h-12 w-full text-lg/8 max-sm:hidden">
        افزودن به سبد خرید
      </PrimaryButton>
      
      
    </div>
  );
}
