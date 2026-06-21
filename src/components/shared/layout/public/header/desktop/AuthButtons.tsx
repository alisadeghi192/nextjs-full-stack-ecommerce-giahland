"use client";
import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import NotificationBadge from "@/components/shared/ui/NotificationBadge";
import OutlineButton from "@/components/shared/ui/OutlineButton";
import {
  useAuthActions,
  useIsAuthenticated,
  useIsLoading,
  useUserAvatar,
  useUserFirstName,
} from "@/features/auth/selectors/auth.selectors";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import {
  useIsProfileDropdownOpen,
  useProfileDropdownActions,
} from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineLogin } from "react-icons/md";
const notifications = 5;

export default function AuthButtons() {
  const isLoading = useIsLoading();
  const isAuthenticated = useIsAuthenticated();
  const userFirstName = useUserFirstName();
  const avatar = useUserAvatar() || "/static/images/default-user.webp";
  const { logout } = useAuthActions();
  const isProfileDropdownOpen = useIsProfileDropdownOpen();
  const { closeProfileDropdown, openProfileDropdown } =
    useProfileDropdownActions();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { totalUnread , refresh } = useNotifications();

  useEffect(() => {
    refresh();
  }, []);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const clearOpenTimeout = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
    clearOpenTimeout();
    openTimeoutRef.current = setTimeout(() => openProfileDropdown(), 100);
  };

  const handleMouseLeave = () => {
    clearOpenTimeout();
    closeTimeoutRef.current = setTimeout(() => closeProfileDropdown(), 75);
  };

  const handleLogout = () => {
    closeProfileDropdown();
    logout();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-12 w-12 animate-pulse rounded-full bg-gray-200 max-lg:size-10" />
        <div className="h-12 w-24 animate-pulse rounded-xl bg-gray-200 max-lg:hidden" />
      </div>
    );
  }
  console.log(totalUnread);
  if (isAuthenticated) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          href="/user/profile"
          className="relative flex cursor-pointer items-center gap-2"
        >
          <Image
            src={avatar || "/static/images/default-user.webp"}
            alt="user"
            width={48}
            height={48}
            className="size-12 rounded-full object-cover object-center max-lg:size-10"
          />
          <NotificationBadge count={totalUnread} className="-top-2 -right-1" />
          <span className="text-lg max-lg:hidden">سلام {userFirstName}</span>
        </Link>
        <div
          className={`bg-neutral2 absolute top-full left-0 z-50 flex w-55 flex-col gap-y-2 rounded-lg p-2 shadow-lg transition-all duration-200 ${
            isProfileDropdownOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }`}
          onMouseEnter={clearCloseTimeout}
          onMouseLeave={handleMouseLeave}
        >
          <Link
            href="/user/profile"
            onClick={closeProfileDropdown}
            className="text-neutral10 hover:text-primary relative flex h-14 w-full cursor-pointer items-center gap-x-3 rounded-lg bg-white px-4 transition-colors"
          >
            <FaRegUser className="size-6" />
            <span className="font-medium">حساب کاربری</span>
            <NotificationBadge count={totalUnread} className="left-4"/>
          </Link>
          <ConfirmDialog
            onConfirm={handleLogout}
            title="آیا مایل به خروج از حساب کاربری هستید؟"
            confirmText="بله، خروج"
            cancelText="خیر"
            className="text-error hover:bg-bg-error flex h-14 w-full cursor-pointer items-center gap-x-3 rounded-lg bg-white px-4 transition-colors"
          >
            <HiOutlineLogout className="size-6" />
            <span className="font-medium text-nowrap">خروج از حساب کاربری</span>
          </ConfirmDialog>
        </div>
      </div>
    );
  }

  return (
    <OutlineButton
      href="/login-register"
      className="h-12 gap-x-2 px-4 max-lg:size-10 max-lg:gap-0 max-lg:px-0"
    >
      <MdOutlineLogin size={24} className="transition-colors" />
      <span className="text-lg/8.5 text-nowrap transition-colors max-lg:hidden">
        ورود/ثبت نام
      </span>
    </OutlineButton>
  );
}
