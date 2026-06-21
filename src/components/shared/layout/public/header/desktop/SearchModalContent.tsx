"use client";

import FormField from "@/components/shared/ui/FormField";
import { searchProducts } from "@/features/products/actions/product.actions";
import { formatPrice } from "@/lib/utils/format";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";

interface SearchModalContentProps {
  onClose: () => void;
  isOpen: boolean;
}

export default function SearchModalContent({ onClose, isOpen }: SearchModalContentProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    onClose();
  };

  return (
    <div className="border-neutral3 w-115 rounded-xl border bg-white p-3 pt-4 pr-1.5 shadow-lg max-md:hidden">
      <FormField
        icon={<IoMdSearch size={22} />}
        id="search"
        type="text"
        label="جستجو"
        name="search"
        ref={inputRef}
        value={query}
        onChange={handleChange}
        usedInConsultation={true}
      />

      <div className="mt-2 max-h-80 overflow-y-auto custom-scroll ltr">
        {isLoading ? (
          <div className="flex items-center justify-center py-6">
            <div className="border-primary h-6 w-6 animate-spin rounded-full border-4 border-t-transparent"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-1">
            {results.map((item) => (
              <Link
                key={item._id}
                href={`/products/${item.category}/${item.slug}`}
                onClick={handleSelect}
                className="hover:bg-neutral2 rtl mr-1.5 block rounded-lg px-4 py-2 leading-7.25 transition-colors"
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
        ) : query && results.length === 0 ? (
          <p className="text-neutral9 px-3 py-2 rtl text-sm">محصولی یافت نشد.</p>
        ) : null}
      </div>
    </div>
  );
}