"use client";
import { useState, useRef, useEffect } from "react";
import { BsSortDownAlt } from "react-icons/bs";

interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  selectedSort: string;
  onSortChange: (value: string) => void;
  options: SortOption[];  
}

export default function SortDropdown({
  selectedSort,
  onSortChange,
  options,
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
    <div className="relative max-xs:w-full" ref={menuRef}>
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="bg-neutral2 border-neutral5 text-primary max-xs:text-sm flex h-12 w-36 max-xs:w-full cursor-pointer items-center justify-center gap-x-2 rounded-xl border max-md:h-11 max-sm:h-10"
      >
        <BsSortDownAlt className="size-6 max-sm:size-5" />
        <span>
          {options.find((option) => option.value === selectedSort)?.label}
        </span>
      </button>
      {showMenu && (
        <div className="absolute top-full left-0 z-20 mt-2 w-36 overflow-hidden rounded-xl border bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setShowMenu(false);
              }}
              className={`hover:bg-neutral3 block w-full px-4 py-2 text-right ${selectedSort === option.value ? "bg-neutral3 text-primary" : "text-neutral12"}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}