"use client";
import React from "react";
import Image from "next/image";
import IconButton from "@/components/shared/ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";
import SearchBox from "../../ui/SearchBox";
import Logo from "../../ui/Logo";
import NavLinks from "../../ui/NavLinks";
import MobileMenu from "../../ui/MobileMenu";
import { useScroll } from "@/lib/hooks/useScroll";
import Link from "next/link";
import OutlineButton from "@/components/shared/ui/OutlineButton";

const isUserLogin = false;

interface PublicHeaderProps {
  hasSearchInput?: boolean;
}

const PublicHeader = ({ hasSearchInput = true }: PublicHeaderProps) => {
  const isScrolled = useScroll();
  return (
    <header className={`sticky top-0 right-0 left-0 z-20 ${isScrolled ? 'h-15' : 'h-24'} `}>
      {/* desktop header */}
      <nav className="border-neutral5 container border-b font-medium max-md:hidden">
        {/* navlinks */}
        <div
          className={`bg-white text-neutral12 flex items-center justify-between transition-all ${isScrolled ? "h-15" : "h-24"} `}
        >
          <div className="flex gap-8 max-lg:gap-4">
            {/* logo */}
            <Logo pageSize="desktop" />
            <div className="flex gap-6 max-lg:gap-3">
              <NavLinks />
            </div>
          </div>
          {/* header buttuns */}
          <div className="flex gap-4 max-xl:gap-2">
            {/* theme btn */}
            <IconButton icon={<MdOutlineDarkMode size={24} />} />
            {/* serach btn */}
            <IconButton icon={<MdOutlineSearch size={24} />} />
            {/* cart btn */}
            <IconButton icon={<MdOutlineShoppingCart size={24} />} />
            {/* login/user btn */}
            {isUserLogin ? (
              <button className="flex items-center gap-2">
                <Image
                  src="/static/images/default-user.jpg"
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="text-lg max-lg:hidden">سلام کاربر</span>
              </button>
            ) : (
              <OutlineButton
                href="/login-register"
                className=" h-12 gap-2 px-4 max-lg:size-12 max-lg:gap-0 max-lg:px-3"
              >
                <MdOutlineLogin size={24} className="transition-colors" />
                <span className="text-lg/8.5 transition-colors max-lg:hidden">
                  ورود/ثبت نام
                </span>
              </OutlineButton>
            )}
          </div>
        </div>
      </nav>
      {/* mobile header */}
      <nav className="border-neutral3 bg-white border-b py-3 md:hidden">
        <div
          className={`container flex flex-col gap-y-3 ${isScrolled ? "gap-y-2.5!" : ""}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* burgur menu */}
              <MobileMenu />
              {/* logo */}
              <Logo pageSize="mobile" />
            </div>
            <div className="flex items-center gap-2">
              {/* theme btn */}
              <IconButton icon={<MdOutlineDarkMode size={20} />} />
              {/* cart btn */}
              <IconButton icon={<MdOutlineShoppingCart size={20} />} />
              {/* user/login btn */}
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
          </div>
          {/* search input */}
          {hasSearchInput && <SearchBox />}
        </div>
      </nav>
    </header>
  );
};

export default PublicHeader;
