"use client";

import { formatDate, formatPrice, toPersianCode, toPersianNumber } from "@/lib/utils/format";

interface UserInfoFieldsProps {
  user: {
    mobile: string;
    email: string;
    createdAt: Date;
    role: "admin" | "user" | "plant-doctor";
    postalCode?: string;
    address?: string;
    specialties?: string;
    yearsOfExperience?: number;
    consultationFee?: number;
    successfulConsultations?: number;
  };
}

export default function UserInfoFields({ user }: UserInfoFieldsProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr] gap-y-2 max-lg:grid-cols-1 max-sm:self-start">
      <div className="flex items-center gap-x-2">
        <span className="text-neutral9">موبایل:</span>
        <span>{toPersianCode(user.mobile)}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <span className="text-neutral9">تاریخ ثبت‌نام:</span>
        <span>{formatDate(new Date(user.createdAt))}</span>
      </div>
      <div className="flex items-center gap-x-2">
        <span className="text-neutral9">ایمیل:</span>
        <span className="line-clamp-1">{user.email}</span>
      </div>

      {user.role === "user" && (
        <>
          <div className="flex items-center gap-x-2">
            <span className="text-neutral9">کد پستی:</span>
            <span>
              {toPersianCode(user.postalCode as string) || "ثبت نشده"}
            </span>
          </div>
          <div className="col-span-2 flex items-start gap-x-2 max-lg:col-span-1">
            <span className="text-neutral9">آدرس:</span>
            <span>
              {toPersianCode(user.address as string) || "ثبت نشده"}
            </span>
          </div>
        </>
      )}
      {user.role === "plant-doctor" && (
        <>
          <div className="flex items-center gap-x-2">
            <span className="text-neutral9">سال‌های تجربه:</span>
            {toPersianNumber(user.yearsOfExperience || 0)}
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-neutral9">تخصص:</span>
            <span>{user.specialties || "ثبت نشده"}</span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-neutral9">مشاوره‌های موفق:</span>
            {toPersianNumber(user.successfulConsultations || 0)}
          </div>
          <div className="flex items-center gap-x-2">
            <span className="text-neutral9">هزینه مشاوره:</span>
            {formatPrice(user.consultationFee || 0)}
          </div>
        </>
      )}
    </div>
  );
}