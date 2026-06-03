"use client";
import { Logo } from "@/components/shared/layout/public/header";
import IconButton from "@/components/shared/ui/IconButton";
import { MdOutlineDarkMode } from "react-icons/md";
import Image from "next/image";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";

interface PanelHeaderProps {
  isScrolled: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function PanelHeader({
  isScrolled,
  isSidebarOpen,
  toggleSidebar,
}: PanelHeaderProps) {
  return (
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
              {isSidebarOpen ? (
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
  );
}
