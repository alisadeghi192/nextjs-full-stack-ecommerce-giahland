"use client";

import IconButton from "../../ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineShoppingCart,
} from "react-icons/md";
import Link from "next/link";
import Image from "next/image";

interface MobileActionsProps {
  onCartClick: () => void;
}

const isUserLogin = true;

export default function MobileActions({ onCartClick }: MobileActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <IconButton icon={<MdOutlineDarkMode size={20} />} />
      <IconButton
        icon={<MdOutlineShoppingCart size={20} />}
        onClick={onCartClick}
      />

      {isUserLogin ? (
        <Image
          src="/static/images/default-user.jpg"
          alt="user profile"
          width={48}
          height={48}
          className="rounded-full max-md:size-10 max-sm:size-8"
        ></Image>
      ) : (
        <Link href="/login-register">
          <IconButton icon={<MdOutlineLogin size={20} />} />
        </Link>
      )}
    </div>
  );
}
