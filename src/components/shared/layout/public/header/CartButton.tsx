"use client";

import IconButton from "@/components/shared/ui/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import CartModal from "@/components/features/cart/CartModal";
import { useIsCartOpen, useCartActions } from "@/stores/selectors/ui.selectors";

export default function CartButton() {
  const isCartOpen = useIsCartOpen();
  const { toggleCart, closeCart } = useCartActions();
  return (
    <div className="relative" >
      <IconButton icon={<MdOutlineShoppingCart size={24} />} onClick={toggleCart}/>

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
