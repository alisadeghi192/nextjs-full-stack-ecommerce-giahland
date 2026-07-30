"use client";

import FormField from "@/components/shared/ui/FormField";
import { useProductSearch } from "@/lib/hooks/useProductSearch";
import { toPersianPrice } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { IoMdSearch } from "react-icons/io";

interface SearchModalContentProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function SearchModalContent({ onClose, isOpen }: SearchModalContentProps) {
  const { query, setQuery, results, isLoading } = useProductSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timeout);
    } else {
      setQuery("");
    }
  }, [isOpen, setQuery]);

  const handleSelect = () => {
    onClose();
  };

  return (
    <div className="border-neutral3 dark:border-neutral10 w-115 rounded-xl border bg-white dark:bg-shade3 p-3 pt-4 pr-1.5 shadow-lg max-md:hidden">
      <FormField
        icon={<IoMdSearch size={22} />}
        id="search"
        type="text"
        label="جستجو"
        name="search"
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        isMainSearch={true}
      />

      <div className="custom-scroll ltr mt-2 max-h-80 overflow-y-auto">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="border-primary dark:border-primary-dark dark:border-t-transparent h-6 w-6 animate-spin rounded-full border-4 border-t-transparent" />
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-1">
            {results.map((item) => (
              <Link
                key={item._id}
                href={`/products/${item.category}/${item.slug}`}
                onClick={handleSelect}
                className="hover:bg-neutral2 dark:hover:bg-shade4 rtl mr-1.5 block rounded-lg px-4 py-2 leading-7.25 transition-colors"
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
        ) : query && results.length === 0 ? (
          <p className="text-neutral9 rtl px-3 dark:text-text-dark py-2 text-sm">محصولی یافت نشد.</p>
        ) : null}
      </div>
    </div>
  );
}