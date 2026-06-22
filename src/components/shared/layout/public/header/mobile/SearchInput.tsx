"use client";
import { searchProducts } from "@/features/products/actions/searchProducts.actions";
import { formatPrice } from "@/lib/utils/format";
import {
  useIsSearchOpen,
  useSearchActions,
} from "@/stores/selectors/ui.selectors";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";

interface SearchInputProps {
  isScrolled: boolean;
}

const SearchInput = ({ isScrolled }: SearchInputProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const isSearchOpen = useIsSearchOpen();
  const { openSearch, closeSearch } = useSearchActions();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      inputRef.current?.focus();
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length >= 2) {
        handleSearch(query);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = async (value: string) => {
    if (value.trim().length < 2) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const data = await searchProducts(value);
      setResults(data);
    } catch (error) {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSelect = () => {
    closeSearch();
  };

  return (
    <div
      className={`${isScrolled ? "h-8" : "h-10"} bg-neutral3 relative flex w-full items-center gap-x-2 rounded-xl px-3 py-2.5 transition-all`}
    >
      <MdOutlineSearch className="text-neutral9 size-5" />
      <input
        type="text"
        placeholder="جستجوی گیاه"
        className="text-neutral11 placeholder:text-neutral9 w-full border-0 outline-0"
        onFocus={() => {
          if (!isSearchOpen) openSearch();
        }}
        ref={inputRef}
        value={query}
        onChange={handleChange}
      />

      {isSearchOpen && query && (
        <div className="border-neutral3 absolute top-full right-0 left-0 z-40 mt-1 max-h-80 overflow-y-auto rounded-xl border bg-white p-3 pr-1.5 shadow-lg custom-scroll ltr">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="border-primary size-6 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              {results.map((item) => (
                <Link
                  key={item._id}
                  href={`/products/${item.category}/${item.slug}`}
                  onClick={handleSelect}
                  className="hover:bg-neutral2 rtl block rounded-lg px-4 py-2 leading-7.25 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {item.image && (
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-neutral9 text-sm">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-neutral9 rtl px-3 py-2 text-sm">محصولی یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;