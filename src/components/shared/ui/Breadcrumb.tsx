"use client";

import { BREADCRUMB_NAME_MAP } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowLeft, MdOutlineHome } from "react-icons/md";

interface BreadcrumbProps {
  title?: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export default function Breadcrumb({ title }: BreadcrumbProps) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const getDisplayName = (segment: string, isLast: boolean) => {
    if (isLast && title) {
      return title;
    }

    if (isLast && segment.length > 25) {
      return "مشاهده";
    }

    return BREADCRUMB_NAME_MAP[segment] || segment;
  };

  return (
    <nav className=" my-6 flex flex-wrap items-center gap-y-2 max-lg:my-4 ">
      <Link
        href="/"
        className="text-primary hover:text-shade2 dark:hover:text-primary-dark max-xs:text-sm flex items-center gap-x-1 text-base/6.25 font-normal transition-colors"
      >
        <MdOutlineHome className="max-xs:size-4 size-5 mb-1 max-xs:m-0" />
        خانه
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const displayName = getDisplayName(segment, isLast);

        const truncatedDisplayName = truncateText(displayName, 12);

        return (
          <div key={href} className="flex items-center gap-x-1">
            <MdKeyboardArrowLeft className="max-xs:size-4 text-neutral9 transition-colors dark:text-text-dark mr-1 size-6 max-md:size-5" />
            {isLast ? (
              <span className="text-neutral9 dark:text-text-dark transition-colors max-xs:text-sm inline-block text-base/6.25 font-normal">
                <span className="hidden max-md:inline">
                  {truncatedDisplayName}
                </span>
                <span className="inline max-md:hidden">{displayName}</span>
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-shade2 dark:hover:text-primary-dark text-primary max-xs:text-sm inline-block text-base/6.25 font-normal transition-colors"
              >
                <span>{displayName}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
