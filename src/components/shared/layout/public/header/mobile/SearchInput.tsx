"use client";

import { useProductSearch } from "@/lib/hooks/useProductSearch";
import { toPersianPrice } from "@/lib/utils/format";
import { useIsSearchOpen, useSearchActions } from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MdOutlineSearch } from "react-icons/md";

interface SearchInputProps {
  isScrolled: boolean;
}

export default function SearchInput({ isScrolled }: SearchInputProps) {
  const { query, setQuery, results, isLoading } = useProductSearch();
  const isSearchOpen = useIsSearchOpen();
  const { openSearch, closeSearch } = useSearchActions();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    } else {
      setQuery("");
    }
  }, [isSearchOpen, setQuery]);

  const handleSelect = () => {
    closeSearch();
  };

  return (
    <div
      className={`${isScrolled ? "h-8" : "h-10"} relative flex w-full items-center gap-x-2 rounded-xl bg-neutral3 dark:bg-shade3 px-3 py-2.5 transition-all`}
    >
      <MdOutlineSearch className="text-neutral9 dark:text-primary-dark transition-colors size-5" />
      <input
        type="text"
        placeholder="جستجوی گیاه"
        className="placeholder:text-neutral9 dark:placeholder:text-primary-dark text-neutral11 dark:text-neutral3 w-full border-0 outline-0"
        onFocus={() => !isSearchOpen && openSearch()}
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isSearchOpen && query && (
        <div className="border-neutral3 dark:border-neutral10 dark:shadow-shade3 dark:bg-shade2 custom-scroll ltr absolute top-full right-0 left-0 z-40 mt-1 max-h-80 overflow-y-auto rounded-xl border bg-white p-3 pr-1.5 shadow-lg">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="border-primary dark:border-primary-dark dark:border-t-transparent size-6 animate-spin rounded-full border-4 border-t-transparent" />
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item) => (
                <Link
                  key={item._id}
                  href={`/products/${item.category}/${item.slug}`}
                  onClick={handleSelect}
                  className="hover:bg-neutral2 dark:hover:bg-shade3 rtl block rounded-lg px-4 py-2 leading-7.25 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-neutral9 dark:text-text-dark text-sm">{toPersianPrice(item.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-neutral9 dark:text-text-dark rtl px-3 py-2 text-sm">محصولی یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
}