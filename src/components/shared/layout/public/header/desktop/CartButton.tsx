"use client";

import CartModal from "@/components/features/cart/CartModal";
import IconButton from "@/components/shared/ui/IconButton";
import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import { useUserRole } from "@/features/auth/selectors/auth.selectors";
import {
    useCartStoreActions,
    useCartTotalItems,
} from "@/features/cart/selectors/cart.selectors";
import { useCartActions, useIsCartOpen } from "@/stores/selectors/ui.selectors";
import { useEffect } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
const totalItems = 2;

export default function CartButton() {
  const isCartOpen = useIsCartOpen();
  const { toggleCart, closeCart } = useCartActions();
  const role = useUserRole();
  const totalItems = useCartTotalItems();
  const { fetchCart } = useCartStoreActions();

  useEffect(() => {
    fetchCart();
  }, []);

  if (role === "plant-doctor" || role === "admin") {
    return null;
  }
  return (
    <div className="relative">
      <div className="relative">
        <IconButton
          icon={<MdOutlineShoppingCart size={24} />}
          onClick={toggleCart}
        />
        <NotificationBadge
          count={totalItems}
          className="-top-1.5 -right-1 max-lg:size-5"
        />
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
