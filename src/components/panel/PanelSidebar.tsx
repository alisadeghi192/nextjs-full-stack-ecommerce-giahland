"use client";
import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import {
  useAuthActions,
  useIsAdmin,
  useUserAvatar,
  useUserFirstName,
  useUserMobile,
  useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import { useAdminNotifications } from "@/features/notifications/hooks/useAdminNotifications";
import { useDoctorNotifications } from "@/features/notifications/hooks/useDoctorNotifications";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { PanelLink } from "@/lib/constants/panelLinks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import ConfirmDialog from "../shared/ui/ConfirmDialog";

interface PanelSidebarProps {
  links: PanelLink[];
  isPanelOpen: boolean;
  onClose?: () => void;
  isAdminPanel: boolean;
}

export default function PanelSidebar({
  links,
  isPanelOpen,
  onClose,
  isAdminPanel = false,
}: PanelSidebarProps) {
  const pathname = usePathname();
  const mobile = useUserMobile();
  const avatar = useUserAvatar();
  const firstName = useUserFirstName();
  const { logout } = useAuthActions();
  const isAdmin = useIsAdmin();
  const userRole = useUserRole()

  const { consultation : userConsultation, ticket : userTicket, refresh: refreshUser } = useNotifications();
  const {consultation:doctorConsultaion ,doctorComments,ticket :doctorTicket,refresh:refreshDOctor} = useDoctorNotifications()
  const { tickets: adminTicket, contact, comments: adminComments, refresh: refreshAdmin, } = useAdminNotifications();


  const displayName = firstName || "کاربر";
  const persianMobile = mobile?.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]) || "";

  useEffect(() => {
    if (userRole === "admin") {
      refreshAdmin();
    } else if (userRole === "plant-doctor") {
      refreshDOctor()
    }else{
      refreshUser()
    }
  }, [userRole]);

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
              <span className="text-neutral9">{persianMobile}</span>
            </div>
          )}
        </div>
      </div>

      <div className={`${isAdminPanel ? "mt-2" : "mt-4"} flex-1`}>
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

          let badgeCount = 0;
          let showBadge = false;

          if (link.href.includes("/consultations") && userRole === "plant-doctor") {
            badgeCount = doctorConsultaion;
            showBadge = true;
          } else if (link.href.includes("/consultations") && userRole === "user") {
            badgeCount = userConsultation;
            showBadge = true;
          } else if (link.href === "/admin/tickets") {
            badgeCount = adminTicket;
            showBadge = true;
          } else if (link.href.includes("/tickets") &&  userRole === "plant-doctor") {
            badgeCount = doctorTicket;
            showBadge = true;
          }else if (link.href.includes("/tickets") &&  userRole === "user") {
            badgeCount = userTicket;
            showBadge = true;
          } else if (link.href === "/admin/contact-messages") {
            badgeCount = contact;
            showBadge = true;
          } else if (link.href === "/admin/comments") {
            badgeCount = adminComments;
            showBadge = true;
          } else if (link.href === "/user/comments") {
            badgeCount = doctorComments;
            showBadge = true;
          }

          return (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                onClick={onClose}
                className={`text-neutral10 hover:text-primary flex ${isAdminPanel ? "h-11" : "h-14"} items-center gap-x-3 rounded-r-lg pr-4 transition-colors max-md:h-12 ${
                  isActive
                    ? "text-primary border-primary border-l-4 bg-[#F3FDFA]"
                    : ""
                }`}
              >
                {showBadge && badgeCount > 0 && (
                  <NotificationBadge
                    count={badgeCount}
                    className={`size-5! ${isPanelOpen ? "hidden" : "top-0 right-1"}`}
                  />
                )}
                <span className="relative flex w-6 shrink-0 items-center justify-center">
                  {link.icon}
                  {!isPanelOpen && (
                    <div className="pointer-events-none invisible absolute -top-8.5 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="bg-primary relative rounded-lg border px-2 py-1 text-xs whitespace-nowrap text-white shadow-lg">
                        {link.tooltipLabel}
                        <span className="text-primary absolute top-3 left-1/2 -translate-x-1/2 text-lg">
                          ▼
                        </span>
                      </div>
                    </div>
                  )}
                </span>
                {isPanelOpen && (
                  <span className="relative text-lg/8 text-nowrap max-md:text-base/7.25">
                    {link.label}
                    {showBadge && badgeCount > 0 && (
                      <NotificationBadge
                        count={badgeCount}
                        className={`size-5! ${isPanelOpen ? "top-0 bottom-0 -left-8 my-auto" : "hidden"}`}
                      />
                    )}
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
