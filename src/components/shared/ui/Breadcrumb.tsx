"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowLeft, MdOutlineHome } from "react-icons/md";

export default function Breadcrumb() {
  const nameMap: Record<string, string> = {
    products:"محصولات",
  };

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center mt-6 mb-8 max-lg:mt-4 max-lg:mb-4 max-md:mt-7 max-sm:mt-5  ">
      <Link
        href="/"
        className="text-primary hover:text-shade2 flex items-center gap-x-1 text-lg/8 max-md:text-base/6.25 max-xs:text-sm font-normal transition-colors"
      >
        <MdOutlineHome className="size-6 max-md:size-5 max-xs:size-4" />
        خانه
      </Link>

      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <div key={href} className="flex items-center gap-x-1">
            <MdKeyboardArrowLeft className="size-6 max-md:size-5 max-xs:size-4 text-neutral9 mr-1" />
            {isLast ? (
              <span className=" text-neutral9 font-normal text-lg/8 max-md:text-base/6.25 max-xs:text-sm">
                {nameMap[segment] || segment}
              </span>
            ) : (
              <Link
                href={href}
                className="hover:text-shade2 transition-colors"
              >
                {nameMap[segment] || segment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
