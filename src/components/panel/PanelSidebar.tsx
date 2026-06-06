"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useUserMobile,
  useUserAvatar,
  useUserFirstName,
  useUserRole,
  useAuthActions,
} from "@/features/auth/selectors/auth.selectors";
import { HiOutlineLogout } from "react-icons/hi";
import { PanelLink } from "@/lib/constants/panelLinks";

interface PanelSidebarProps {
  links: PanelLink[];
  isPanelOpen: boolean;
}

export default function PanelSidebar({
  links,
  isPanelOpen,
}: PanelSidebarProps) {
  const pathname = usePathname();
  const role = useUserRole();
  const mobile = useUserMobile();
  const avatar = useUserAvatar();
  const firstName = useUserFirstName();
  const { logout } = useAuthActions();

  const displayName = firstName || "کاربر";
  const persianMobile = mobile?.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]) || "";
  return (
    <div className="custom-scroll flex h-full flex-col overflow-x-hidden ltr *:rtl pr-1 overflow-y-auto py-6">
      <div >
        <div className="flex items-center shrink-0 gap-x-2">
          <Image
            src={avatar || "/static/images/default-user.jpg"}
            alt="user"
            width={60}
            height={60}
            className="size-15 rounded-full object-cover object-center"
          />
          {isPanelOpen && (
            <div className="flex flex-col gap-y-1 text-sm/6.25">
              <span className="font-medium">{displayName}</span>
              {role && <span className="text-neutral9">{persianMobile}</span>}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex-1">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-neutral10 hover:text-primary flex h-14.5 items-center gap-x-3 rounded-r-lg pr-4 transition-colors ${
              pathname === link.href
                ? "text-primary border-primary border-l-4 bg-[#F3FDFA]"
                : ""
            }`}
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

      {/* Logout */}
      <button
        onClick={logout}
        className="text-error bg-neutral2 border-error hover:bg-error/10 mt-auto flex h-14 shrink-0 cursor-pointer items-center gap-x-3 rounded-r-lg border-l-4 px-4 transition-colors"
      >
        <span className="flex w-6 shrink-0 items-center justify-center">
          <HiOutlineLogout className="size-6" />
        </span>
        {isPanelOpen && (
          <span className="font-medium text-nowrap">خروج از حساب کاربری</span>
        )}
      </button>
    </div>
  );
}
