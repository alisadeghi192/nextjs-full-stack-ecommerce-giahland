"use client";

import IconButton from "@/components/shared/ui/IconButton";
import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import {
    useIsAdmin,
    useIsAuthenticated,
    useIsLoading,
    useUserAvatar,
    useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import {
    useCartStoreActions,
    useCartTotalItems,
} from "@/features/cart/selectors/cart.selectors";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import { useCartActions } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
    MdOutlineDarkMode,
    MdOutlineLogin,
    MdOutlineShoppingCart,
} from "react-icons/md";

export default function MobileActions() {
  const isLoading = useIsLoading();
  const isAuthenticated = useIsAuthenticated();
  const avatar = useUserAvatar();
  const userRole = useUserRole();
  const isAdmin = useIsAdmin();
  const { toggleCart } = useCartActions();
  const totalItems = useCartTotalItems();
  const { fetchCart } = useCartStoreActions();
  const isDoctor = userRole === "plant-doctor";
  const showCart = !isDoctor && !isAdmin;

  useEffect(() => {
    fetchCart();
  }, []);

  const { userTotal, adminTotal, doctorTotal } = useAllNotifications();

  return (
    <div className="flex items-center gap-2">
      <IconButton icon={<MdOutlineDarkMode size={20} />} />

      {showCart && (
        <div className="relative">
          <IconButton
            icon={<MdOutlineShoppingCart size={20} />}
            onClick={toggleCart}
          />
          <NotificationBadge
            count={totalItems}
            className="-top-1.5 -right-1 max-md:size-4.5 max-md:text-[11px]"
          />
        </div>
      )}

      {isLoading ? (
        <div className="size-8 animate-pulse rounded-full bg-gray-200 max-md:size-10 max-sm:size-8" />
      ) : isAuthenticated ? (
        <Link
          href={`${isAdmin ? "/admin/dashboard" : "/user/profile"}`}
          className="relative"
        >
          <Image
            src={avatar || "/static/images/default-user.webp"}
            alt="user profile"
            width={48}
            height={48}
            className="rounded-full max-md:size-10 max-sm:size-8"
          />
          <NotificationBadge
            count={
              userRole === "admin"
                ? adminTotal
                : userRole === "plant-doctor"
                  ? doctorTotal
                  : userTotal
            }
            className="-top-1.5 -right-1 max-md:size-4.5 max-md:text-[11px]"
          />
        </Link>
      ) : (
        <Link href="/login-register">
          <IconButton icon={<MdOutlineLogin size={20} />} />
        </Link>
      )}
    </div>
  );
}
