"use client";

import FormField from "@/components/shared/ui/FormField";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

interface ConsultationSearchProps {
  defaultValue?: string;
  classname? : string;
}

export default function ConsultationSearch({ defaultValue = "" , classname }: ConsultationSearchProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`${pathname}?search=${query.trim()}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    router.push(pathname);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`flex items-center bg-whit max-[400px]:w-full ${classname}`}>
      <div className="flex-1">
        <FormField
          icon={<IoSearch className="size-5" />}
          id="consultation-search"
          type="text"
          label="کد‌ مشاوره"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          usedInConsultation={true}
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={!query.trim()}
        className={`rounded-lg p-1 transition-colors ${
          query.trim()
            ? "text-primary hover:bg-primary/10"
            : "text-neutral9 cursor-not-allowed"
        }`}
      >
        <IoSearch className="size-6 cursor-pointer" />
      </button>
      {query && (
        <button
          onClick={handleClear}
          className="rounded-lg p-1 text-red-500 transition-colors hover:bg-red-50"
        >
          <IoClose className="size-6 cursor-pointer" />
        </button>
      )}
    </div>
  );
}