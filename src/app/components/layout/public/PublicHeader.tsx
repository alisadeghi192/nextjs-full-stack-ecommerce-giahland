import React from "react";
import Image from "next/image";
import IconButton from "@/app/components/shared/ui/IconButton";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";
import SearchBox from "../../shared/ui/SearchBox";
import Logo from "../../shared/ui/Logo";
import NavLinks from "../../shared/ui/NavLinks";
import MobileMenu from "../../shared/ui/MobileMenu";

const isUserLogin = false;

const PublicHeader = () => {
  return (
    <header className="font-modam">
      {/* desktop header */}
      <nav className="border-neutral5 border-b font-medium max-md:hidden">
        {/* navlinks */}
        <div className="bg-WHITE text-neutral12 flex items-center justify-between py-6">
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
                  src="/default-user.jpg"
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="text-lg max-lg:hidden">سلام کاربر</span>
              </button>
            ) : (
              <button className="border-primary group hover:border-shade2 transition-color flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 max-lg:size-12 max-lg:gap-0 max-lg:px-3">
                <MdOutlineLogin
                  size={24}
                  className="text-primary group-hover:text-shade2 transition-colors"
                />
                <span className="text-primary group-hover:text-shade2 text-lg/8.5 transition-colors max-lg:hidden">
                  ورود/ثبت نام
                </span>
              </button>
            )}
          </div>
        </div>
      </nav>
      {/* mobile header */}
      <nav className="border-neutral3 flex flex-col gap-y-3 border-b p-3 sm:p-4 md:hidden">
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
                src="/default-user.jpg"
                alt="user profile"
                width={32}
                height={32}
                className="rounded-full sm:size-10"
              ></Image>
            ) : (
              <IconButton icon={<MdOutlineLogin size={20} />} />
            )}
          </div>
        </div>
        {/* search input */}
        <SearchBox />
      </nav>
    </header>
  );
};

export default PublicHeader;
