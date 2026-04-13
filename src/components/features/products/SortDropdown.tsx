"use client";
import { useState, useRef, useEffect } from "react";
import { BsSortDownAlt } from "react-icons/bs";

const sortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "price_asc", label: "ارزان‌ترین" },
  { value: "price_desc", label: "گران‌ترین" },
  { value: "popular", label: "محبوب‌ترین" },
];

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (value: string) => void;
}

export default function SortDropdown({
  selectedSort,
  onSortChange,
}: SortDropdownProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-neutral2 border-neutral5 text-primary flex h-12 w-36 cursor-pointer items-center justify-center gap-x-2 rounded-xl border"
      >
        <BsSortDownAlt className="size-6" />
        <span>
          {sortOptions.find((option) => option.value === selectedSort)?.label}
        </span>
      </button>
      {showMenu && (
        <div className="absolute left-0 top-full mt-2 w-36 rounded-xl border bg-white shadow-lg z-10 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setShowMenu(false);
              }}
              className={`block w-full px-4 py-2 text-right hover:bg-neutral3 ${selectedSort === option.value ? "bg-neutral3 text-primary" : "text-neutral12"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
