"use client";

import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import { DEFAULT_PROFILE_PIC } from "@/lib/constants";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdStopCircle } from "react-icons/md";

interface AdminChatHeaderProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  doctor: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  isActive: boolean;
  isClosing: boolean;
  onClose: () => void;
  userDisplayName: string;
  doctorDisplayName: string;
}

export default function AdminChatHeader({
  user,
  doctor,
  isActive,
  isClosing,
  onClose,
  userDisplayName,
  doctorDisplayName,
}: AdminChatHeaderProps) {
  const router = useRouter();
  const isSidebarOpen = useIsSidebarOpen();

  return (
    <div className="max-xs:h-12 max-xs:gap-1 max-xs:top-16 sticky top-18 z-10 mx-auto flex h-14.5 w-9/10 items-center gap-2 transition-all duration-200">
      {/* close consultation button */}
      {isActive && (
        <ConfirmDialog
          onConfirm={onClose}
          cancelText="خیر"
          confirmText="بله"
          title="آیا از بستن مشاوره مطمئنید؟"
          disabled={isClosing}
          className={`border-neutral9 dark:border-neutral10 max-xs:size-10 flex h-14 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full border bg-red-500/60 px-2 text-white backdrop-blur-lg transition-colors hover:bg-red-500 max-sm:size-14 ${
            isSidebarOpen ? "max-lg:size-14" : ""
          }`}
        >
          <span
            className={`leading-tight max-sm:hidden ${
              isSidebarOpen ? "max-lg:hidden" : ""
            }`}
          >
            {isClosing ? "درحال بستن..." : "پایان مشاوره"}
          </span>
          <MdStopCircle
            className={`size-8 shrink-0 ${isClosing ? "hidden" : ""}`}
          />
        </ConfirmDialog>
      )}

      <div className="border-neutral5 dark:border-neutral10 max-xs:p-0 maxsm:h-10 flex w-full items-center justify-between rounded-full border bg-white/40 dark:bg-primary/10 p-1 backdrop-blur-md">
        {/* user */}
        <div className="max-xs:gap-2 max-xs:w-full flex items-center gap-4 max-sm:gap-2">
          <div className="max-xs:size-10 relative size-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={user.avatar || DEFAULT_PROFILE_PIC}
              alt={userDisplayName}
              fill
              className="size-full object-cover"
            />
          </div>
          <div className="max-xs:flex max-xs:justify-between max-xs:items-center max-xs:w-full">
            <h2 className="font-medium max-sm:text-sm">{userDisplayName}</h2>
            <p className="text-primary dark:text-primary-dark max-xs:ml-2 text-sm max-sm:hidden">کاربر</p>
          </div>
        </div>
        {/* doctor */}
        <div className="max-xs:gap-2 max-xs:w-full flex items-center gap-4 max-sm:gap-2">
          <div className="max-xs:flex max-xs:justify-between max-xs:items-center max-xs:w-full">
            <h2 className="font-medium text-left max-sm:text-sm mr-auto">
              {doctorDisplayName}
            </h2>
            <p className="text-primary dark:text-primary-dark text-left max-xs:ml-2 text-sm max-sm:hidden">پزشک</p>
          </div>
          <div className="max-xs:size-10 relative size-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={doctor.avatar || DEFAULT_PROFILE_PIC}
              alt={doctorDisplayName}
              fill
              className="size-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* back button */}
      <button
        onClick={() => router.back()}
        className="border-neutral5 max-xs:size-10 dark:border-neutral10 flex h-14 cursor-pointer items-center justify-center gap-x-2 rounded-full border bg-gray-100/40 px-4 dark:bg-primary/10 dark:hover:bg-primary/20 text-gray-600 dark:text-gray-200 backdrop-blur-lg transition-colors hover:bg-gray-200/40"
      >
        <span
          className={`max-sm:hidden ${isSidebarOpen ? "max-lg:hidden" : ""}`}
        >
          بازگشت
        </span>
        <MdArrowBack className="size-6 shrink-0" />
      </button>
    </div>
  );
}