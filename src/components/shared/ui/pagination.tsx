import Link from "next/link";
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = (): (number | string)[] => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
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
    <div className="mt-8 flex items-center flex-wrap justify-center gap-2">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}&page=${currentPage - 1}`}
          className="p-2"
        >
          <MdKeyboardArrowRight className="size-6 text-primary"/>
        </Link>
      )}

      {pageNumbers.map((page, index) => {
        if (page === "...") {
          return (
            <span key={index} className="flex items-center leading-6 justify-center border border-primary size-10 rounded-lg">
              ...
            </span>
          );
        }
        return (
          <Link
            key={index}
            href={`${baseUrl}&page=${page}`}
            className={`flex items-center justify-center leading-6 border border-primary size-10 rounded-lg transition-colors ${
              currentPage === page
                ? "bg-primary text-white"
                : "hover:bg-gray-50"
            }`}
          >
            {page.toLocaleString('fa-IR')}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}&page=${currentPage + 1}`}
          className="p-2"
        >
          <MdOutlineKeyboardArrowLeft className="size-6 text-primary"/> 
        </Link>
      )}
    </div>
  );
}