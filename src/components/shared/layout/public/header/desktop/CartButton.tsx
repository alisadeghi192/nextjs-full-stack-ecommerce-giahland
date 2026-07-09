"use client";

import CartModal from "@/components/features/cart/CartModal";
import IconButton from "@/components/shared/ui/IconButton";
import { useUserRole } from "@/features/auth/selectors/auth.selectors";
import { toPersianNumber } from "@/lib/utils/format";
import { useCartActions, useIsCartOpen } from "@/stores/selectors/ui.selectors";
import { MdOutlineShoppingCart } from "react-icons/md";
const totalItems = 2;

export default function CartButton() {
  const isCartOpen = useIsCartOpen();
  const { toggleCart, closeCart } = useCartActions();
  const role = useUserRole();
  if (role === "plant-doctor" || role === "admin") return null;
  return (
    <div className="relative">
      <div className="relative">
        <IconButton
          icon={<MdOutlineShoppingCart size={24} />}
          onClick={toggleCart}
        />
        {totalItems > 0 && (
          <span className="bg-error absolute font-medium text-white text-[10px] -top-1.25 -right-1.25 flex size-5.5 items-center justify-center rounded-full">
            {toPersianNumber(totalItems)}
          </span>
        )}
      </div>

      <div
        className={`absolute top-13.5 left-0 z-70 transition-all duration-200 max-lg:top-12.5 ${
          isCartOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <CartModal onClose={closeCart} />
      </div>
    </div>
  );
}
