import SectionTitle from "@/components/panel/SectionTitle";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface FactorHeaderProps{
  href : string
}

export default function FactorHeader({href}:FactorHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <SectionTitle title="جزئیات سفارش" className="mb-0!" />
      <Link
        href={href}
        className="flex h-10 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-gray-100 px-4 text-gray-600 transition-colors hover:bg-gray-200"
      >
        <span>بازگشت</span>
        <MdArrowBack className="size-5 shrink-0" />
      </Link>
    </div>
  );
}
