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
          isPanelSearch={true}
        />
      </div>
      <button
        onClick={handleSearch}
        disabled={!query.trim()}
        className={`flex items-center mr-2 justify-center rounded-xl size-10 bg-primary transition-colors ${
          query.trim()
            ? "text-primary hover:bg-shade2"
            : "text-neutral9 cursor-not-allowed"
        }`}
      >
        <IoSearch className={`size-5 text-white ${query.trim() ? "cursor-pointer" : "cursor-not-allowed"} `} />
      </button>
      {query && (
        <button
          onClick={handleClear}
          className="flex items-center mr-1 text-red-500 hover:text-error  justify-center rounded-xl transition-colors"
        >
          <IoClose className="size-6 cursor-pointer" />
        </button>
      )}
    </div>
  );
}