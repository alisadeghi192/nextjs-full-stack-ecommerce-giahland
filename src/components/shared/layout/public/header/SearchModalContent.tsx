"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FormField from "@/components/shared/ui/FormField";
import { IoMdSearch } from "react-icons/io";

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

interface SearchModalContentProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function SearchModalContent({ onClose, isOpen }: SearchModalContentProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof fakeData>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length === 0) {
      setResults([]);
      return;
    }

    const filtered = fakeData.filter((item) =>
      item.name.includes(value.trim())
    );
    setResults(filtered);
  };

  const handleSelect = () => {
    onClose();
  };

  return (
    <div
      className="border-neutral3 w-115 rounded-xl border bg-white p-3 pt-4 pr-1.5 shadow-lg max-md:hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <FormField
        icon={<IoMdSearch size={22} />}
        id="search"
        type="text"
        label="جستجو"
        name="search"
        ref={inputRef}
        value={query}
        onChange={handleChange}
        useInSearchButtun={true}
      />
      <div>

      {results.length > 0 && (
        
        <div className="mt-2 max-h-64 overflow-y-auto custom-scroll ltr space-y-2">
          {results.map((item) => (
            <Link
              key={item.id}
              href={`/`}
              onClick={handleSelect}
              className="hover:bg-neutral2 rounded-lg mr-1.5 rtl block px-4 py-2 text-neutral9 hover:text-primary leading-7.25 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
      {query && results.length === 0 && (
        <p className="text-neutral9 mt-2 px-3 py-2 text-sm">
          محصولی یافت نشد.
        </p>
      )}
      </div>

    </div>
  );
}