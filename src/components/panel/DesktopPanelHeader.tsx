"use client";
import { Logo } from "@/components/shared/layout/public/header";
import {
  useIsLoading,
  useUserAvatar,
  useUserFirstName,
} from "@/features/auth/selectors/auth.selectors";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import Image from "next/image";
import {
  TbLayoutSidebarLeftExpandFilled,
  TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";
import ThemeButton from "../shared/ui/ThemeButton";

interface DesktopPanelHeaderProps {
  isScrolled: boolean;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function DesktopPanelHeader({
  isScrolled,
  isSidebarOpen,
  toggleSidebar,
}: DesktopPanelHeaderProps) {
  const userFirstName = useUserFirstName();
  const userAvatar = useUserAvatar();
  const isLoading = useIsLoading();

  return (
    <nav className="border-neutral5 dark:border-neutral10 container border-b font-medium max-md:hidden">
      <div
        className={`text-neutral12 dark:bg-shade5 flex items-center justify-between bg-white ${
          isScrolled ? "h-15" : "h-24"
        }`}
        style={{
          transition:
            "height 200ms, color 150ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="flex items-center gap-x-4">
          <div
            className="text-primary dark:text-primary-dark dark:hover:text-primary hover:text-shade2 cursor-pointer"
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
          <ThemeButton />
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="dark:bg-shade3 h-12 w-12 animate-pulse rounded-full bg-gray-200 max-lg:size-10" />
              <div className="dark:bg-shade3 h-12 w-24 animate-pulse rounded-xl bg-gray-200 max-lg:hidden" />
            </div>
          ) : (
            <button className="flex items-center gap-2">
              <Image
                src={userAvatar || DEFAULT_PROFILE_PIC}
                alt="user"
                width={48}
                height={48}
                className="size-12 rounded-full object-cover object-center max-lg:size-10"
              />
              <span className="text-lg max-lg:hidden dark:text-white">
                سلام {userFirstName}
              </span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
