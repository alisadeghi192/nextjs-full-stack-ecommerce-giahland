"use client";

import IconButton from "@/components/shared/ui/IconButton";
import { MdOutlineSearch } from "react-icons/md";
import FormField from "@/components/shared/ui/FormField";
import { IoMdSearch } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface SearchButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const fakeData = [
  {
    id: "1",
    name: "بابا آدم",
  },
  {
    id: "2",
    name: "یوکا",
  },
  {
    id: "3",
    name: "سانسوریا",
  },
  {
    id: "4",
    name: "کاکتوس",
  },
  {
    id: "5",
    name: "بچه کاکتوس",
  },
  {
    id: "6",
    name: "فیلندندرون",
  },
  {
    id: "7",
    name: "زاموفیلیا",
  },
  {
    id: "8",
    name: "بونسای",
  },
  {
    id: "9",
    name: "پتوس",
  },
  {
    id: "10",
    name: "توس ابلق",
  },
];

export default function SearchButton({
  isOpen,
  onToggle,
  onClose,
}: SearchButtonProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof fakeData>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      });
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
      item.name.includes(value.trim()),
    );
    setResults(filtered);
  };

  const handleSelect = () => {
    onClose();
    setQuery("");
    setResults([]);
  };
  return (
    <div className="relative" >
      <IconButton icon={<MdOutlineSearch size={24} />}  onClick={onToggle}/>

      <div
        className={`absolute top-13.5 left-0 z-70 shadow-lg transition-all duration-200 max-lg:top-12.5 ${
          isOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible translate-y-2 opacity-0"
        }`}
      >
        <div
          className="border-neutral3 w-115 rounded-xl border bg-white p-3 pt-4 pr-1.5 shadow-lg max-md:w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
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
            {results.length > 0 && (
              <div className=" mt-2 max-h-64  overflow-y-auto custom-scroll ltr space-y-2">
                {results.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/`}
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
                محصولی یافت نشد
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
