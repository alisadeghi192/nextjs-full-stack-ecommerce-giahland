"use client";
import { Logo } from "@/components/shared/layout/public/header";
import { useUserAvatar } from "@/features/auth/selectors/auth.selectors";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import Image from "next/image";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import ThemeButton from "../shared/ui/ThemeButton";

interface MobilePanelHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function MobilePanelHeader({
  isSidebarOpen,
  toggleSidebar,
}: MobilePanelHeaderProps) {
  const userAvatar = useUserAvatar();

  return (
    <nav className="border-neutral3 dark:bg-shade5 dark:border-neutral10 flex h-14 items-center border-b bg-white md:hidden">
      <div className="container flex w-full items-center justify-between">
        <div className="flex w-full items-center gap-x-3">
          <div
            className="text-primary hover:text-shade2 dark:text-primary-dark dark:hover:text-primary cursor-pointer"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <TbLayoutSidebarLeftExpandFilled className="size-8" />
            ) : (
              <TbLayoutSidebarRightExpandFilled className="size-8" />
            )}
          </div>
          <Logo />
        </div>
        <div className="flex shrink-0 items-center gap-x-2">
          <ThemeButton/>
          <Image
            src={userAvatar || DEFAULT_PROFILE_PIC}
            alt="user profile"
            width={48}
            height={48}
            className="rounded-full object-cover max-md:size-10 max-sm:size-8"
          />
        </div>
      </div>
    </nav>
  );
}
