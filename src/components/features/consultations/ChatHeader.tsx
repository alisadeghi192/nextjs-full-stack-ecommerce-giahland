"use client";
import ConfirmDialog from "@/components/shared/ui/ConfirmDialog";
import { closeConsultation } from "@/features/consultations/actions/closeConsultation.actions";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack, MdStopCircle } from "react-icons/md";

interface ChatHeaderProps {
  consultationId: string;
  displayPersonRole: string;
  displayName: string;
  displayAvatar: string;
  status: string;
  isDoctor: boolean;
}

export default function ChatHeader({
  displayPersonRole,
  displayName,
  displayAvatar,
  status,
  isDoctor,
  consultationId,
}: ChatHeaderProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isChatActive = status === "active";
  const showFinishButton = isChatActive && isDoctor;
  const isSidebarOpen = useIsSidebarOpen()

  const finishChat = async () => {
    setIsLoading(true);
    const result = await closeConsultation(consultationId);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="sticky top-18 z-10 h-14.5 max-xs:h-12 mx-auto flex w-9/10 items-center gap-2 max-xs:gap-1 transition-all duration-200">
      {/* close consultation button */}
      {showFinishButton && (
        <ConfirmDialog
          onConfirm={finishChat}
          cancelText="خیر"
          confirmText="بله"
          title="آیا از بستن مشاوره مطمئنید؟"
          disabled={isLoading}
          className={`border-neutral9 shrink-0 flex h-14 cursor-pointer items-center justify-center gap-x-2 rounded-full border bg-red-500 px-2 text-white transition-colors hover:bg-red-600 max-sm:size-14 max-xs:size-10 ${isSidebarOpen ? "max-lg:size-14" : ""}`}
        >
          <span className={`leading-tight max-sm:hidden ${isSidebarOpen ? "max-lg:hidden" : ""}`}>
            {isLoading ? "درحال بستن..." : "پایان مشاوره"}
          </span>
          <MdStopCircle className={`size-8 shrink-0 ${isLoading ? "hidden" : ""}`} />
        </ConfirmDialog>
      )}

      {/* display person details */}
      <div className="border-neutral5 flex w-full items-center justify-between rounded-full border bg-white p-1 max-xs:p-0 maxsm:h-10">
        <div className="flex items-center gap-4 max-xs:gap-2 max-xs:w-full">
          <div className="relative size-12 max-xs:size-10 overflow-hidden shrink-0 rounded-full">
            <Image
              src={displayAvatar}
              alt={displayName}
              fill
              className="size-full object-cover"
            />
          </div>
          <div className="max-xs:flex max-xs:justify-between max-xs:items-center max-xs:w-full">
            <h2 className="font-medium">{displayName}</h2>
            <p className="text-primary text-sm max-xs:ml-2">{displayPersonRole}</p>
          </div>
        </div>
        {/* consultation status */}
        <div
          className={`ml-2 rounded-full px-2 py-2 text-sm max-xs:hidden ${isChatActive ? "text-primary bg-green-100" : "bg-bg-error text-error"}`}
        >
          <span>{isChatActive ? "چت فعال" : "چت بسته"}</span>
        </div>
      </div>
      {/* back button */}
      <Link
        href="/user/consultations/list"
        className="border-neutral5 flex h-14 items-center justify-center gap-x-2 rounded-full border bg-gray-100 px-4 text-gray-600 transition-colors hover:bg-gray-200 max-xs:size-10"
      >
        <span className={`max-sm:hidden ${isSidebarOpen ? "max-lg:hidden" : ""}`}>بازگشت</span>
        <MdArrowBack className="size-6 shrink-0" />
      </Link>
    </div>
  );
}
