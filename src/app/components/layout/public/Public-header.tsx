import React from "react";
import Link from "next/link";
import NavLink from "@/app/components/shared/ui/NavLink";
import Image from "next/image";
import IconButton from "@/app/components/shared/ui/Icon-button";
import {
  MdOutlineDarkMode,
  MdOutlineLogin,
  MdOutlineMenu,
  MdOutlineSearch,
  MdOutlineShoppingCart,
} from "react-icons/md";

const navLinks = [
  { text: "صفحه اصلی", href: "/" },
  { text: "گیاه پزشک", href: "/plant-doctor" },
  { text: "وبلاگ", href: "/blogs" },
  { text: "تماس با ما", href: "/contact-us" },
  { text: "درباره ما", href: "/about-us" },
];

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
            <Link href="/">
              <h4 className="text-primary hover:text-shade3 text-2xl/8.5 font-bold transition-colors">
                گیاه لند
              </h4>
            </Link>

            <div className="flex gap-6 max-lg:gap-3">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  href={link.href}
                  className="hover:text-primary text-lg/8.5 transition-colors"
                >
                  {link.text}
                </NavLink>
              ))}
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
            <button className="bg-neutral3 flex size-8 items-center justify-center rounded-lg sm:size-10">
              <MdOutlineMenu className="size-5 sm:size-6" />
            </button>
            {/* logo */}
            <Link href="/">
              <h6 className="text-primary leading-5.5 font-medium sm:text-xl">
                گیاه لند
              </h6>
            </Link>
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
        <div className="bg-neutral3 flex h-10 w-full items-center gap-2 rounded-lg px-3 py-2.5">
          <MdOutlineSearch className="text-neutral9 size-5" />
          <input
            type="text"
            placeholder="جستجوی گیاه "
            className="text-neutral11 placeholder:text-neutral9 w-full border-0 outline-0"
          ></input>
        </div>
      </nav>
    </header>
  );
};

export default PublicHeader;
