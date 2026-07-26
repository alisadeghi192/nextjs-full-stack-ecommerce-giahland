"use client";

import { signoutAction } from "@/features/auth/actions/signout.actions";
import { MdLogout } from "react-icons/md";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signoutAction();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-500 h-10 text-white transition hover:bg-red-600"
    >
      <MdLogout className="size-5" />
      خروج از حساب کاربری
    </button>
  );
}