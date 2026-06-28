"use client";
import { Logo } from "@/components/shared/layout/public/header";
import IconButton from "@/components/shared/ui/IconButton";
import {
    useUserAvatar,
    useUserFirstName,
} from "@/features/auth/selectors/auth.selectors";
import Image from "next/image";
import { MdOutlineDarkMode } from "react-icons/md";
import {
    TbLayoutSidebarLeftExpandFilled,
    TbLayoutSidebarRightExpandFilled,
} from "react-icons/tb";

interface DesktopAdminHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export default function DesktopAdminHeader({
  isSidebarOpen,
  toggleSidebar,
}: DesktopAdminHeaderProps) {
  const userFirstName = useUserFirstName();
  const userAvatar = useUserAvatar();

  return (
    <nav className="border-neutral5 container border-b font-medium max-md:hidden">
      <div
        className={`text-neutral12 h-15 flex items-center justify-between bg-white transition-all duration-200`}
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
              src={userAvatar || "/static/images/default-user.webp"}
              alt="user"
              width={48}
              height={48}
              className="size-12 rounded-full object-cover object-center max-lg:size-10"
            />
            <span className="text-lg max-lg:hidden">سلام {userFirstName}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}