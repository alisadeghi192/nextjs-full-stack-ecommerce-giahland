"use client";
import { Logo } from "@/components/shared/layout/public/header";
import { useScroll } from "@/lib/hooks/useScroll";
import { useState } from "react";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { BsHeart, BsTruck } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { usePathname } from "next/navigation";

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
  { href: "/user/orders", icon: <BsTruck  size={24} />, label: "تاریخچه سفارش ها" },
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
          <div className="flex h-full overflow-y-auto flex-col py-6">
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

            <div className="mt-6 flex flex-1 flex-col gap-y-2.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={` text-neutral10 rounded-r-lg transition-colors hover:text-primary flex h-14.5 items-center gap-x-3 pr-4
                    ${pathname === link.href ? "bg-[#F3FDFA] text-primary border-l-4 border-primary" : ""}
                    `}
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

            <button className="text-error bg-neutral2 border-error hover:bg-error/10 mt-auto flex h-14 cursor-pointer items-center gap-x-3 rounded-r-lg border-l-4 px-4 transition-colors">
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
      </div>
    </main>
  );
}
