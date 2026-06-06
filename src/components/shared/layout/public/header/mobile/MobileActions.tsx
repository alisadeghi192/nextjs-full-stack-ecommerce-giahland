"use client";

import IconButton from "@/components/shared/ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineShoppingCart,
} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import {
  useIsAuthenticated,
  useIsLoading,
} from "@/features/auth/selectors/auth.selectors";
import { useCartActions } from "@/stores/selectors/ui.selectors";
import { toPersianNumber } from "@/lib/utils/format";

const totalItems = 2;
const notifications = 2;

export default function MobileActions() {
  const isLoading = useIsLoading();
  const isAuthenticated = useIsAuthenticated();
  const { toggleCart } = useCartActions();

  return (
    <div className="flex items-center gap-2">
      <IconButton icon={<MdOutlineDarkMode size={20} />} />
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

      {isLoading ? (
        <div className="size-8 animate-pulse rounded-full bg-gray-200 max-md:size-10 max-sm:size-8" />
      ) : isAuthenticated ? (
        <Link href="/user" className="relative">
          <Image
            src="/static/images/default-user.jpg"
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
