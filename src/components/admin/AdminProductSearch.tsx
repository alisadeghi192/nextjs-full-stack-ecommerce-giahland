"use client";

import FormField from "@/components/shared/ui/FormField";
import { useUrlParams } from "@/lib/hooks/useUrlParams";
import { useState } from "react";
import { IoClose, IoSearch } from "react-icons/io5";

interface AdminProductSearchProps {
  defaultValue?: string;
  className?: string;
}

export default function AdminProductSearch({
  defaultValue = "",
  className = "",
}: AdminProductSearchProps) {
  const { set } = useUrlParams();
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = () => {
    if (query.trim()) {
      set("search", query.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    set("search", "");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`flex items-center max-[400px]:w-full ${className}`}>
      <div className="flex-1">
        <FormField
          icon={<IoSearch className="size-5" />}
          id="product-search"
          type="text"
          label="جستجوی محصول"
          name="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          isSearch={true}
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