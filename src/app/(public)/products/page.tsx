"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Breadcrumb from "@@/components/shared/ui/Breadcrumb";
import ProductsTabs from "@@/components/features/products/ProductsTabs";
import { MdDensityMedium, MdGridView, MdSort } from "react-icons/md";
import { BsSortDownAlt } from "react-icons/bs";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeTab = searchParams.get("category") || "indoor";
  const viewMode = searchParams.get("view") || "grid";

  const setViewMode = (mode: "grid" | "list") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.push(`?${params.toString()}`);
  };

  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <div className="flex items-center justify-between">
          <ProductsTabs
            activeTab={activeTab as "indoor" | "decoration" | "gift"}
          />

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

            <button className="bg-neutral2 border-neutral5 text-primary flex h-12 w-36 cursor-pointer items-center justify-center gap-x-2 rounded-xl border">
              <BsSortDownAlt className="size-6" />
              <span>مرتب سازی</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
