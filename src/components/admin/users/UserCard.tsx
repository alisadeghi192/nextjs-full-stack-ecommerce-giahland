"use client";

import { DEFAULT_PROFILE_PIC, ROLE_CONFIG } from "@/lib/constants";
import { toPersianCode, toPersianDate } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";

interface UserCardProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    mobile: string;
    email: string;
    role: "admin" | "user" | "plant-doctor";
    avatar: string;
    isBlocked: boolean;
    createdAt: Date;
  };
}

export default function UserCard({ user }: UserCardProps) {
  const displayName = `${user.firstName} ${user.lastName}`.trim() || "کاربر";

  return (
    <Link
      href={`/admin/users/${user._id}`}
      className="border-neutral3 dark:border-neutral10 dark:shadow-shade6 dark:bg-shade3 group relative rounded-2xl border bg-white p-4 shadow-lg transition-all hover:shadow-xl"
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative size-20 overflow-hidden rounded-full">
          <Image
            src={user.avatar || DEFAULT_PROFILE_PIC}
            alt={displayName}
            fill
            className="object-cover"
          />
        </div>
        <h4 className="group-hover:text-primary dark:group-hover:text-primary-dark mt-3 font-semibold transition-colors">
          {displayName}
        </h4>
        <h4 className="text-neutral10 dark:text-gray-300 mt-1 font-semibold">
          {toPersianCode(user.mobile)}
        </h4>
        <p className="text-neutral9 dark:text-text-dark mt-1 text-xs">
          ثبت‌نام: {toPersianDate(new Date(user.createdAt))}
        </p>
        {user.isBlocked && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-100 dark:bg-red-700">
            مسدود
          </span>
        )}
        <div className="flex items-center">
          <span
            className={`absolute top-3 right-3 h-5 rounded-md px-2 text-xs/5 font-medium ${ROLE_CONFIG[user.role].className}`}
          >
            {ROLE_CONFIG[user.role].label}
          </span>
        </div>
      </div>
    </Link>
  );
}
