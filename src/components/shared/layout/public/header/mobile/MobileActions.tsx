"use client";

import IconButton from "@/components/shared/ui/IconButton";
import {
  useIsAuthenticated,
  useIsLoading,
  useUserAvatar,
  useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import { toPersianNumber } from "@/lib/utils/format";
import { useCartActions } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineShoppingCart,
} from "react-icons/md";

const totalItems = 2;
const notifications = 2;

export default function MobileActions() {
  const isLoading = useIsLoading();
  const isAuthenticated = useIsAuthenticated();
  const avatar = useUserAvatar();
  const userRole = useUserRole();
  const { toggleCart } = useCartActions();

  const isDoctor = userRole === "plant-doctor";
  const showCart = !isDoctor;

  return (
    <div className="flex items-center gap-2">
      <IconButton icon={<MdOutlineDarkMode size={20} />} />

      {showCart && (
        <div className="relative">
          <IconButton
            icon={<MdOutlineShoppingCart size={20} />}
            onClick={toggleCart}
          />
          {totalItems > 0 && (
            <span className="bg-error absolute -top-1.75 -right-1.5 flex size-4.5 items-center justify-center rounded-full text-[10px] font-medium text-white">
              {toPersianNumber(totalItems)}
            </span>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="size-8 animate-pulse rounded-full bg-gray-200 max-md:size-10 max-sm:size-8" />
      ) : isAuthenticated ? (
        <Link href="/user" className="relative">
          <Image
            src={avatar || "/static/images/default-user.webp"}
            alt="user profile"
            width={48}
            height={48}
            className="rounded-full max-md:size-10 max-sm:size-8"
          />
          <span className="bg-error absolute -top-1.75 -right-1.5 flex size-4.5 items-center justify-center rounded-full text-[10px] font-medium text-white">
            {toPersianNumber(notifications)}
          </span>
        </Link>
      ) : (
        <Link href="/login-register">
          <IconButton icon={<MdOutlineLogin size={20} />} />
        </Link>
      )}
    </div>
  );
}