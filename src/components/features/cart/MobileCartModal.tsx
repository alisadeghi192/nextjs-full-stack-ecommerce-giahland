"use client";

import CartModal from "./CartModal";
import { useIsCartOpen, useCartActions } from "@/stores/selectors/ui.selectors";

export default function MobileCartModal() {
  const isCartOpen = useIsCartOpen();
  const { closeCart } = useCartActions();
  return (
    <div className="relative">
      <div
        className={`absolute -top-10 left-0 z-40 w-full transition-all duration-200 ${
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
