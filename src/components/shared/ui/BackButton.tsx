"use client"
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex h-10 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-gray-100 dark:bg-emerald-900 px-4 text-gray-600 dark:text-gray-100 transition-colors hover:bg-gray-200 dark:hover:bg-emerald-800 max-xs:px-0 max-xs:size-10"
    >
      <span className="max-xs:hidden">بازگشت</span>
      <MdArrowBack className="size-5 shrink-0" />
    </button>
  );
}
