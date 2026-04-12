'use client'
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@@/components/shared/ui/Breadcrumb";
import ProductsTabs from "@@/components/features/products/ProductsTabs";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("category") || "indoor";
  console.log(activeTab)

  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <div>
          <ProductsTabs activeTab={activeTab as "indoor" | "decoration" | "gift"} />
        </div>
        <div className="mt-8">
        </div>
      </section>
    </main>
  );
}