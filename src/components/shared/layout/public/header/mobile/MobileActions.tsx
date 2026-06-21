"use client";

import IconButton from "@/components/shared/ui/IconButton";
import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import {
  useIsAuthenticated,
  useIsLoading,
  useUserAvatar,
  useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useCartActions } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineShoppingCart,
} from "react-icons/md";

const totalItems = 2;

export default function MobileActions() {
  const isLoading = useIsLoading();
  const isAuthenticated = useIsAuthenticated();
  const avatar = useUserAvatar();
  const userRole = useUserRole();
  const { toggleCart } = useCartActions();
  const { totalUnread, refresh } = useNotifications();
  const isDoctor = userRole === "plant-doctor";
  const showCart = !isDoctor;

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="flex items-center gap-2">
      <IconButton icon={<MdOutlineDarkMode size={20} />} />

      {showCart && (
        <div className="relative">
          <IconButton
            icon={<MdOutlineShoppingCart size={20} />}
            onClick={toggleCart}
          />
          {totalItems > 0 && <NotificationBadge count={totalItems} />}
        </div>
      )}

      {isLoading ? (
        <div className="size-8 animate-pulse rounded-full bg-gray-200 max-md:size-10 max-sm:size-8" />
      ) : isAuthenticated ? (
        <Link href="/user/profile" className="relative">
          <Image
            src={avatar || "/static/images/default-user.webp"}
            alt="user profile"
            width={48}
            height={48}
            className="rounded-full max-md:size-10 max-sm:size-8"
          />
          <NotificationBadge count={totalUnread}  className="-top-2 -right-1 max-sm:size-4 max-sm:text-[10px]"/>
        </Link>
      ) : (
        <Link href="/login-register">
          <IconButton icon={<MdOutlineLogin size={20} />} />
        </Link>
      )}
    </div>
  );
}
