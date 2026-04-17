import Link from "next/link";
import {
  MdKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {currentPage > 1 && (
        <Link href={`${baseUrl}&page=${currentPage - 1}`} className="p-2">
          <MdKeyboardArrowRight className="text-primary size-6" />
        </Link>
      )}

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={index}
              className="border-primary flex size-10 max-md:size-7 items-center justify-center rounded-lg border leading-6"
            >
              ...
            </span>
          );
        }
        return (
          <Link
            key={index}
            href={`${baseUrl}&page=${page}`}
            className={`border-primary flex size-10 max-md:size-7 items-center justify-center rounded-lg border leading-6 transition-colors ${
              currentPage === page
                ? "bg-primary text-white"
                : "hover:bg-gray-50"
            }`}
          >
            {page.toLocaleString("fa-IR")}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link href={`${baseUrl}&page=${currentPage + 1}`} className="p-2">
          <MdOutlineKeyboardArrowLeft className="text-primary size-6" />
        </Link>
      )}
    </div>
  );
}
