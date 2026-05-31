"use client";
import { Logo } from "@/components/shared/layout/public/header";
import { useScroll } from "@/lib/hooks/useScroll";
import { useState } from "react";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { MdOutlineDarkMode, MdOutlineLocalPharmacy } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { BsHeart, BsTruck } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { usePathname } from "next/navigation";
import IconButton from "@/components/shared/ui/IconButton";

const links = [
  { href: "/user", icon: <FaRegUser size={24} />, label: "مشخصات کاربری" },
  {
    href: "/user/consultations",
    icon: <MdOutlineLocalPharmacy size={24} />,
    label: "مشاروه با گیاه پزشک",
  },
  {
    href: "/user/tickets",
    icon: <LuNotebookPen size={24} />,
    label: "تیکت ها",
  },
  { href: "/user/wishlist", icon: <BsHeart size={24} />, label: "علاقمندی ها" },
  {
    href: "/user/orders",
    icon: <BsTruck size={24} />,
    label: "تاریخچه سفارش ها",
  },
];

export default function PanelPage() {
  const pathname = usePathname();
  const isScrolled = useScroll();
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const toggleSidebar = () => setIsPanelOpen((prev) => !prev);

  return (
    <main>
      {/* header */}
      <header className="sticky top-0 right-0 left-0 z-50">
        <nav className="border-neutral5 container border-b font-medium max-md:hidden">
          <div
            className={`text-neutral12 flex items-center justify-between bg-white transition-all duration-200 ${
              isScrolled ? "h-15" : "h-24"
            }`}
          >
            <div className="flex items-center gap-x-4">
              <div
                className="text-primary hover:text-shade2 cursor-pointer"
                onClick={toggleSidebar}
              >
                {isPanelOpen ? (
                  <TbLayoutSidebarLeftExpandFilled className="size-10" />
                ) : (
                  <TbLayoutSidebarRightExpandFilled className="size-10" />
                )}
              </div>
              <Logo />
            </div>
            <div className="flex items-center gap-x-4">
              <IconButton icon={<MdOutlineDarkMode size={24} />} />
              <button className="flex items-center gap-2">
                <Image
                  src="/static/images/default-user.jpg"
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full max-lg:size-10"
                />
                <span className="text-lg max-lg:hidden">سلام کاربر</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative container flex">
        {/* sidebar */}
        <div
          className={`${isScrolled ? "top-15 h-[calc(100dvh-60px)]" : "top-24 h-[calc(100dvh-96px)]"} ${isPanelOpen ? "w-72" : "w-18"} border-neutral3 sticky shrink-0 overflow-hidden border-l bg-white`}
          style={{
            transition: "width 300ms ease, top 200ms ease, height 200ms ease",
          }}
        >
          {/* sidebar content */}
          <div className="custom-scroll flex h-full flex-col overflow-x-hidden ltr *:rtl pr-1 overflow-y-auto py-6">
            <div>
              <div className="flex items-center gap-x-2">
                <Image
                  src="/static/images/default-user.jpg"
                  alt="user"
                  width={60}
                  height={60}
                  className="size-15 rounded-full"
                />
                {isPanelOpen && (
                  <div className="flex flex-col gap-y-1 text-sm/6.25">
                    <span className="font-medium"> علی صادقی</span>
                    <span className="text-neutral9"> ۰۹۰۳۷۰۲۹۱۲۱</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-1 flex-col gap-y-1.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-neutral10 hover:text-primary flex h-12.5 items-center gap-x-3 rounded-r-lg pr-4 transition-colors ${pathname === link.href ? "text-primary border-primary border-l-4 bg-[#F3FDFA]" : ""} `}
                >
                  <span className="flex w-6 shrink-0 items-center justify-center">
                    {link.icon}
                  </span>
                  {isPanelOpen && (
                    <span className="text-lg/8 text-nowrap">{link.label}</span>
                  )}
                </Link>
              ))}
            </div>

            <button className="text-error bg-neutral2 border-error hover:bg-error/10 mt-auto flex h-14 shrink-0 cursor-pointer items-center gap-x-3 rounded-r-lg border-l-4 px-4 transition-colors">
              <span className="flex w-6 shrink-0 items-center justify-center">
                <HiOutlineLogout className="size-6" />
              </span>
              {isPanelOpen && (
                <span className="font-medium text-nowrap">
                  خروج از حساب کاربری
                </span>
              )}
            </button>
          </div>
        </div>
        <div className="h-1500"></div>
      </div>
    </main>
  );
}
