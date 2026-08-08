"use client";

import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import {
  useAuthActions,
  useIsAdmin,
  useIsAuthenticated,
  useUserAvatar,
  useUserFirstName,
  useUserRole,
} from "@/features/auth/selectors/auth.selectors";
import { useAllNotifications } from "@/features/notifications/hooks/useAllNotifications";
import { DEFAULT_PROFILE_PIC, NAV_LINKS } from "@/lib/constants";
import { useIsMenuOpen, useMenuActions } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogin, MdOutlineMenu } from "react-icons/md";
import { Logo, MobileNavLink } from "..";

const MobileMenu = () => {
  const isAuthenticated = useIsAuthenticated();
  const { logout } = useAuthActions();
  const isMenuOpen = useIsMenuOpen();
  const { closeMenu, toggleMenu } = useMenuActions();
  const userAvatar = useUserAvatar();
  const isAdmin = useIsAdmin();
  const firstName = useUserFirstName();
  const userRole = useUserRole();
  const { userTotal, adminTotal, doctorTotal } = useAllNotifications();
  const handleLogout = async () => {
    closeMenu();
    logout();
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="bg-neutral3 dark:bg-shade3 transition-colors flex size-8 items-center justify-center rounded-lg sm:size-10"
      >
        <MdOutlineMenu className="size-5 sm:size-6 dark:text-primary-dark transition-colors" />
      </button>
      <div
        className={`border-neutral3 dark:border-neutral10 fixed top-0 -right-70 z-40 h-dvh w-70 rounded-tl-xl rounded-bl-xl border bg-white p-4 shadow-lg dark:bg-shade4 dark:shadow-shade6 transition-all duration-200 ${
          isMenuOpen
            ? "visible -translate-x-70 opacity-100"
            : "invisible translate-x-70 opacity-0"
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div onClick={closeMenu}>
              <Logo />
            </div>
            <button onClick={closeMenu}>
              <IoClose className="size-6" />
            </button>
          </div>
          {isAuthenticated && (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-x-2">
                <div className="relative size-16 overflow-hidden rounded-full">
                  <Image
                    alt="user profile pic"
                    src={userAvatar || DEFAULT_PROFILE_PIC}
                    fill
                    className="object-cover object-center"
                  ></Image>
                </div>
                <p>سلام {firstName}</p>
              </div>
              <Link
                href={`${isAdmin ? "/admin/dashboard" : "/user/profile"}`}
                onClick={closeMenu}
                className="text-neutral10 dark:text-text-dark dark:hover:text-primary-dark border-neutral3 dark:border-neutral10 dark:bg-shade4 hover:text-primary relative flex h-14 w-full cursor-pointer items-center  border-b bg-white transition-colors"
              >
                {isAdmin ? (
                  <IoSettingsOutline className="size-5" />
                ) : (
                  <FaRegUser className="size-5" />
                )}

                <span className="mr-2 font-medium">
                  {isAdmin ? "پنل مدیریت" : "حساب کاربری"}
                </span>
                <NotificationBadge
                  count={
                    userRole === "admin"
                      ? adminTotal
                      : userRole === "plant-doctor"
                        ? doctorTotal
                        : userTotal
                  }
                  className="left-1"
                />
              </Link>
            </div>
          )}

          <div className="divide-neutral3 dark:divide-neutral10 flex flex-col divide-y overflow-x-hidden overflow-y-auto">
            {NAV_LINKS.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                submenu={link.submenu}
                menuOpen={isMenuOpen}
                onLinkClick={closeMenu}
                className="text-neutral10 dark:text-text-dark flex h-14 items-center justify-between"
              >
                {link.text}
              </MobileNavLink>
            ))}
          </div>

          <div className="bg-neutral2 dark:bg-error/20 mt-auto w-full rounded-lg">
            {isAuthenticated ? (
              <ConfirmDialog
                onConfirm={handleLogout}
                title="آیا مایل به خروج از حساب کاربری هستید؟"
                confirmText="بله، خروج"
                cancelText="خیر"
                className="text-error flex h-14 w-full items-center gap-x-4 px-4"
              >
                <HiOutlineLogout className="size-6" />
                <span className="leading-7.25 font-medium">
                  خروج از حساب کاربری
                </span>
              </ConfirmDialog>
            ) : (
              <Link
                className="text-primary flex h-14 items-center gap-x-4 px-4"
                href="/login-register"
                onClick={closeMenu}
              >
                <MdOutlineLogin className="size-6" />
                <span className="leading-7.25 font-medium">ورود/ثبت نام</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileMenu;
