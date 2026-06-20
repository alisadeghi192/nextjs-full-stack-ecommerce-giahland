"use client";
import {
  useAuthActions,
  useUserAvatar,
  useUserFirstName,
  useUserMobile,
  useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import { PanelLink } from "@/lib/constants/panelLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineLogout } from "react-icons/hi";
import ConfirmDialog from "../shared/ui/ConfirmDialog";

interface PanelSidebarProps {
  links: PanelLink[];
  isPanelOpen: boolean;
  onClose?: () => void;
}

export default function PanelSidebar({
  links,
  isPanelOpen,
  onClose,
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

    <div className="custom-scroll ltr *:rtl flex h-full flex-col overflow-x-hidden overflow-y-auto py-6 pr-1 max-md:py-0">
      <div>
        <div className="flex shrink-0 items-center gap-x-2">
          <Image
            src={avatar || "/static/images/default-user.webp"}
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
        {links.map((link) => {
          let isActive = false;
          if (
            link.href === "/user/consultations" ||
            link.href === "/user/consultations/list"
          ) {
            isActive = pathname.includes("/consultations");
          } else {
            const lastPart = link.href.split("/").pop() || "";
            isActive = pathname.includes(lastPart);
          }
          return (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                onClick={onClose}
                className={`text-neutral10 hover:text-primary flex h-14 items-center gap-x-3 rounded-r-lg pr-4 transition-colors max-md:h-12 ${
                  isActive
                    ? "text-primary border-primary border-l-4 bg-[#F3FDFA]"
                    : ""
                }`}
              >
                <span className="relative flex w-6 shrink-0 items-center justify-center">
                  {link.icon}
                  {!isPanelOpen && (
                    <div className="pointer-events-none invisible absolute -top-8.5 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="relative rounded-lg bg-primary px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg border">
                        {link.tooltipLabel}
                        <span className="absolute top-3 left-1/2 -translate-x-1/2 text-lg text-primary">
                          ▼
                        </span>
                      </div>
                    </div>
                  )}
                </span>
                {isPanelOpen && (
                  <span className="text-lg/8 text-nowrap max-md:text-base/7.25">
                    {link.label}
                  </span>
                )}
              </Link>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        onConfirm={logout}
        title="آیا مایل به خروج از حساب کاربری هستید؟"
        confirmText="بله، خروج"
        cancelText="خیر"
        className="text-error bg-neutral2 border-error hover:bg-error/10 mt-auto flex h-14 w-full shrink-0 cursor-pointer items-center gap-x-3 rounded-r-lg border-l-4 px-4 transition-colors max-md:h-12"
      >
        <span className="flex w-6 shrink-0 items-center justify-center">
          <HiOutlineLogout className="size-6" />
        </span>
        {isPanelOpen && (
          <span className="font-medium text-nowrap">خروج از حساب کاربری</span>
        )}
      </ConfirmDialog>
    </div>
  );
}
