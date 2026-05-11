"use client";

import React from "react";
import { MdOutlineMenu } from "react-icons/md";
import { navLinks } from "@/lib/constants";
import Logo from "./Logo";
import { IoClose } from "react-icons/io5";
import MobileNavLink from "./MobileNavLink";
import Link from "next/link";
import { TbLogin2, TbLogout2 } from "react-icons/tb";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  toggleMenu: () => void;
}

const isUserLogin = false;

const MobileMenu = ({ isOpen, onClose, toggleMenu }: MobileMenuProps) => {
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
            <IoClose className="size-6" onClick={onClose} />
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

          {isUserLogin ? (
            <Link
              className="text-error bg-neutral2 mt-auto flex h-14 w-full items-center justify-between rounded-lg px-4"
              href="/"
            >
              <span className="leading-7.25 font-medium">
                خروج از حساب کاربری
              </span>
              <TbLogout2 className="size-6" />
            </Link>
          ) : (
            <Link
              className="text-primary bg-neutral2 mt-auto flex h-14 w-full items-center justify-between rounded-lg px-4"
              href="/login-register"
            >
              <span className="leading-7.25 font-medium">ورود/ثبت نام</span>
              <TbLogin2 className="size-6" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
export default MobileMenu;
