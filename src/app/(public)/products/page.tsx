'use client'
import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ProductsTabs from "@/components/features/products/ProductsTabs";
import { MdDensityMedium, MdGridView } from "react-icons/md";
import { BsSortDownAlt } from "react-icons/bs";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeTab = searchParams.get("category") || "indoor";
  const viewMode = searchParams.get("view") || "grid";
  const selectedSort = searchParams.get("sort") || "newest";
  
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const setViewMode = (mode: "grid" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.push(`?${params.toString()}`);
  };

  const setSort = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortValue);
    router.push(`?${params.toString()}`);
    setShowMenu(false);
  };

  const sortOptions = [
    { value: "newest", label: "جدیدترین" },
    { value: "price_asc", label: "ارزان‌ترین" },
    { value: "price_desc", label: "گران‌ترین" },
    { value: "popular", label: "محبوب‌ترین" },
  ];

  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <div className="flex items-center justify-between">
          <ProductsTabs activeTab={activeTab as "indoor" | "decoration" | "gift"} />

          <div className="flex items-center gap-x-4">
            <button
              onClick={() => setViewMode("grid")}
              className={`border-neutral5 flex size-12 cursor-pointer items-center justify-center rounded-xl border transition-all ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "bg-neutral2 text-primary"
              }`}
            >
              <MdGridView className="size-6" />
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`border-neutral5 flex size-12 cursor-pointer items-center justify-center rounded-xl border transition-all ${
                viewMode === "list"
                  ? "bg-primary text-white"
                  : "bg-neutral2 text-primary"
              }`}
            >
              <MdDensityMedium className="size-6" />
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="bg-neutral2 border-neutral5 text-primary flex h-12 w-36 cursor-pointer items-center justify-center gap-x-2 rounded-xl border"
              >
                <BsSortDownAlt className="size-6" />
                <span>
                  {sortOptions.find(option => option.value === selectedSort)?.label}
                </span>
              </button>

              {showMenu && (
                <div className="absolute left-0 top-full mt-2 w-36 rounded-xl border bg-white shadow-lg z-10 overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSort(option.value)}
                      className={`block w-full px-4 py-2 text-right text-neutral12 hover:bg-neutral3 ${
                        selectedSort === option.value ? "bg-neutral3 text-primary" : ""
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}