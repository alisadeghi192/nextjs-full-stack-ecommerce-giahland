"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import {
  useIsSearchOpen,
  useSearchActions,
} from "@/stores/selectors/ui.selectors";

const fakeData = [
  { id: "1", name: "بابا آدم" },
  { id: "2", name: "یوکا" },
  { id: "3", name: "سانسوریا" },
  { id: "4", name: "کاکتوس" },
  { id: "5", name: "بچه کاکتوس" },
  { id: "6", name: "فیلندندرون" },
  { id: "7", name: "زاموفیلیا" },
  { id: "8", name: "بونسای" },
  { id: "9", name: "پتوس" },
  { id: "10", name: "توس ابلق" },
];

interface SearchInputProps {
  isScrolled: boolean;
}

const SearchInput = ({ isScrolled }: SearchInputProps) => {
  const isSearchOpen = useIsSearchOpen();
  const { openSearch, closeSearch } = useSearchActions();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof fakeData>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
          inputRef.current?.focus();
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isSearchOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      return;
    }

    const filtered = fakeData.filter((item) =>
      item.name.includes(value.trim()),
    );
    setResults(filtered);
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
        <div className="border-neutral3 absolute top-full right-0 left-0 z-40 mt-1 rounded-xl border bg-white p-3 pr-1.5 shadow-lg">
          {results.length > 0 ? (
            <div className="custom-scroll ltr max-h-64 space-y-1 overflow-y-auto">
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/`}
                  onClick={handleSelect}
                  className="text-neutral9 rtl block rounded-lg px-4 py-2 leading-7.25"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-neutral9 px-3 py-2 text-sm">محصولی یافت نشد.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
