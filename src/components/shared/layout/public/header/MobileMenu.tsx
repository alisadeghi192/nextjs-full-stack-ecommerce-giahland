"use client";

import React from "react";
import { MdOutlineLogin, MdOutlineLogout, MdOutlineMenu } from "react-icons/md";
import { navLinks } from "@/lib/constants";
import Logo from "./Logo";
import { IoClose } from "react-icons/io5";
import MobileNavLink from "./MobileNavLink";
import Link from "next/link";
import {
  useIsAuthenticated,
  useAuthActions,
} from "@/features/auth/selectors/auth.selectors";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  toggleMenu: () => void;
}

const MobileMenu = ({ isOpen, onClose, toggleMenu }: MobileMenuProps) => {
  const isAuthenticated = useIsAuthenticated();
  const { logout } = useAuthActions();

  const handleLogout = async () => {
    onClose();
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
          isOpen
            ? "visible -translate-x-82 opacity-100"
            : "invisible translate-x-82 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <Logo />
            <div onClick={onClose}>
              <IoClose className="size-6" />
            </div>
          </div>
          <div className="divide-neutral3 flex flex-col divide-y overflow-y-auto">
            {navLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                submenu={link.submenu}
                onLinkClick={onClose}
                className="text-neutral10 flex h-14 items-center justify-between"
              >
                {link.text}
              </MobileNavLink>
            ))}
          </div>
          <div className="bg-neutral2 mt-auto w-full rounded-lg">
            {isAuthenticated ? (
              <button
                className="text-error flex h-14 w-full items-center gap-x-4 px-4"
                onClick={handleLogout}
              >
                <MdOutlineLogout className="size-6" />
                <span className="leading-7.25 font-medium">
                  خروج از حساب کاربری
                </span>
              </button>
            ) : (
              <Link
                className="text-primary flex h-14 items-center gap-x-4 px-4"
                href="/login-register"
                onClick={onClose}
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
