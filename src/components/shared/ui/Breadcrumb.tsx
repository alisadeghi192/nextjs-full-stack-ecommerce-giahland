"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdKeyboardArrowLeft, MdOutlineHome } from "react-icons/md";

export default function Breadcrumb() {
  const nameMap: Record<string, string> = {
    products: "محصولات",
    "plant-doctor" : "گیاه پزشک",
    blogs : "مقاله ها"
  };

  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="max-xs:mb-7 mt-6 mb-8 flex items-center max-lg:mt-4 max-lg:mb-4 max-md:mt-7 max-sm:mt-5">
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

        return (
          <div key={href} className="flex items-center gap-x-1">
            <MdKeyboardArrowLeft className="max-xs:size-4 text-neutral9 mr-1 size-6 max-md:size-5" />
            {isLast ? (
              <span className="text-neutral9 max-xs:text-sm text-lg/8 font-normal max-md:text-base/6.25">
                {nameMap[segment] || segment}
              </span>
            ) : (
              <Link href={href} className="hover:text-shade2 transition-colors">
                {nameMap[segment] || segment}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
