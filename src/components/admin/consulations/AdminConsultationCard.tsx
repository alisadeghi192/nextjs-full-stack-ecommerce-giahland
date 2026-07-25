"use client";

import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import {
  toPersianCode,
  toPersianDate,
  toPersianDateAndTime,
} from "@/lib/utils/format";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface AdminConsultationCardProps {
  consultation: {
    _id: string;
    code: string;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    doctor: {
      _id: string;
      firstName: string;
      lastName: string;
      avatar: string;
    };
    status: "active" | "closed";
    lastMessage?: string;
    lastMessageAt?: Date;
    createdAt: Date;
  };
}

const statusConfig = {
  active: { label: "فعال", className: "bg-green-100 text-green-700" },
  closed: { label: "بسته", className: "bg-bg-error text-error" },
};

export default function AdminConsultationCard({
  consultation,
}: AdminConsultationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const userDisplayName =
    `${consultation.user.firstName} ${consultation.user.lastName}`.trim() ||
    "کاربر";
  const doctorDisplayName =
    `${consultation.doctor.firstName} ${consultation.doctor.lastName}`.trim() ||
    "پزشک";

  const isSidebarOpen = useIsSidebarOpen();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="border-neutral3 hover:border-primary group max-xs:p-2 rounded-xl border bg-white p-4 shadow-lg transition-all hover:shadow-xl">
      {/* accordion header */}
      <div
        className="flex cursor-pointer items-center justify-between gap-2"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-x-3">
          <span className="text-neutral9 text-sm font-medium">کد مشاوره:</span>
          <span className="text-neutral11 max-xs:text-sm font-bold">
            {toPersianCode(consultation.code)}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusConfig[consultation.status].className}`}
          >
            {statusConfig[consultation.status].label}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="max-xs:text-sm">
            {toPersianDate(consultation.createdAt)}📅
          </span>
          <MdKeyboardArrowDown
            className={`size-5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            } text-neutral9 group-hover:text-primary`}
          />
        </div>
      </div>

      {/* accordion content */}
      <div
        className={`grid transition-all duration-300 ${
          isOpen
            ? "mt-3 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-3">
            {/*  doctor and user  */}
            <div
              className={`flex items-center justify-between gap-3 ${
                isSidebarOpen ? "max-lg:flex-wrap" : "max-[580px]:flex-wrap"
              }`}
            >
              <div className="bg-neutral2 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 transition-colors">
                <div className="max-xs:size-12 relative size-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={consultation.doctor.avatar}
                    alt={doctorDisplayName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-primary text-sm font-medium">پزشک</p>
                  <p className="truncate font-medium max-sm:text-sm">
                    دکتر {doctorDisplayName}
                  </p>
                </div>
              </div>
              <div className="bg-neutral2 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 transition-colors">
                <div className="max-xs:size-12 relative size-16 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={consultation.user.avatar}
                    alt={userDisplayName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-neutral9 text-sm font-medium">کاربر</p>
                  <p className="truncate font-medium max-sm:text-sm">
                    {userDisplayName}
                  </p>
                </div>
              </div>
            </div>

            {/* last message detials */}
            <div className="bg-neutral2 flex items-center justify-between rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2">
                <span className="text-neutral9 shrink-0 text-sm">
                  آخرین پیام:
                </span>
                <span className="text-neutral11 max-xs:text-sm line-clamp-1 text-sm">
                  {consultation.lastMessage === "💬 "
                    ? "🖼️ تصویر"
                    : consultation.lastMessage || "پیامی ارسال نشده"}
                </span>
              </div>
              {consultation.lastMessageAt && (
                <span className="ltr text-neutral9 shrink-0 text-xs">
                  ⏱️{" "}
                  {toPersianDateAndTime(new Date(consultation.lastMessageAt))}
                </span>
              )}
            </div>

            {/* link to chat */}
            <div className="flex justify-end">
              <PrimaryButton
                href={`/admin/consultations/${consultation._id}`}
                className="max-xs:w-full h-8 w-37"
              >
                مشاهده جزئیات
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
