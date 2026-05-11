"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowLeft, MdOutlineHome } from "react-icons/md";
import { breadcrumbNameMap } from "@/lib/constants";

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
    
    return breadcrumbNameMap[segment] || segment;
  };

  return (
    <nav className="max-xs:mb-7 mt-6 mb-8 flex flex-wrap items-center gap-y-2 max-lg:mt-4 max-lg:mb-4 max-md:mt-7 max-sm:mt-5">
      <Link
        href="/"
        className="text-primary hover:text-shade2 max-xs:text-sm flex items-center gap-x-1 text-lg/8 font-normal transition-colors max-md:text-base/6.25"
      >
        <MdOutlineHome className="max-xs:size-4 size-6 max-md:size-5" />
        خانه
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;
        const displayName = getDisplayName(segment, isLast);
        
        const truncatedDisplayName = truncateText(displayName, 12);

        return (
          <div key={href} className="flex items-center gap-x-1">
            <MdKeyboardArrowLeft className="max-xs:size-4 text-neutral9 mr-1 size-6 max-md:size-5" />
            {isLast ? (
              <span className="text-neutral9 max-xs:text-sm inline-block text-lg/8 font-normal max-md:text-base/6.25">
                <span className="hidden max-md:inline">{truncatedDisplayName}</span>
                <span className="inline max-md:hidden">{displayName}</span>
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-shade2 text-primary max-xs:text-sm inline-block text-lg/8 font-normal transition-colors max-md:text-base/6.25"
              >
                <span >{displayName}</span>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}