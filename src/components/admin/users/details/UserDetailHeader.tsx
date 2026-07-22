"use client";

import SectionTitle from "@/components/panel/SectionTitle";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function UserDetailHeader() {
  const router = useRouter();
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-x-2">
        <SectionTitle title="مشخصات کاربر" className="mb-0!" />
      </div>

      <button
        onClick={() => router.back()}
        className="flex h-10 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-gray-100 px-4 text-gray-600 transition-colors hover:bg-gray-200"
      >
        <span>بازگشت</span>
        <MdArrowBack className="size-5 shrink-0" />
      </button>
    </div>
  );
}
