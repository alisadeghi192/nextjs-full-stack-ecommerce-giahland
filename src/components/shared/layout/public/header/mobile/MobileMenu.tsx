"use client";

import React from "react";
import { MdOutlineLogin, MdOutlineLogout, MdOutlineMenu } from "react-icons/md";
import { navLinks } from "@/lib/constants";
import { Logo, MobileNavLink } from "..";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import {
  useIsAuthenticated,
  useAuthActions,
} from "@/features/auth/selectors/auth.selectors";
import { useIsMenuOpen, useMenuActions } from "@/stores/selectors/ui.selectors";
import { HiOutlineLogout } from "react-icons/hi";
import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";

const MobileMenu = () => {
  const isAuthenticated = useIsAuthenticated();
  const { logout } = useAuthActions();
  const isMenuOpen = useIsMenuOpen();
  const { closeMenu, toggleMenu } = useMenuActions();

  const handleLogout = async () => {
    closeMenu();
    logout();
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="bg-neutral3 flex size-8 items-center justify-center rounded-lg sm:size-10"
      >
        <MdOutlineMenu className="size-5 sm:size-6" />
      </button>
      <div
        className={`border-neutral3 fixed top-0 -right-82 z-40 h-dvh w-82 rounded-tl-xl rounded-bl-xl border bg-white p-4 shadow-lg transition-all duration-200 ${
          isMenuOpen
            ? "visible -translate-x-82 opacity-100"
            : "invisible translate-x-82 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <Logo />
            <button onClick={closeMenu}>
              <IoClose className="size-6" />
            </button>
          </div>

          <div className="divide-neutral3 flex flex-col divide-y overflow-x-hidden overflow-y-auto">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                submenu={link.submenu}
                menuOpen={isMenuOpen}
                onLinkClick={closeMenu}
                className="text-neutral10 flex h-14 items-center justify-between"
              >
                {link.text}
              </MobileNavLink>
            ))}
          </div>

          <div className="bg-neutral2 mt-auto w-full rounded-lg">
            {isAuthenticated ? (
              <ConfirmDialog
                onConfirm={handleLogout}
                title="آیا مایل به خروج از حساب کاربری هستید؟"
                confirmText="بله، خروج"
                cancelText="خیر"
                className="text-error flex h-14 w-full items-center gap-x-4 px-4"
              >
                <HiOutlineLogout className="size-6" />
                <span className="leading-7.25 font-medium">
                  خروج از حساب کاربری
                </span>
              </ConfirmDialog>
            ) : (
              <Link
                className="text-primary flex h-14 items-center gap-x-4 px-4"
                href="/login-register"
                onClick={closeMenu}
              >
                <MdOutlineLogin className="size-6" />
                <span className="leading-7.25 font-medium">ورود/ثبت نام</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileMenu;
