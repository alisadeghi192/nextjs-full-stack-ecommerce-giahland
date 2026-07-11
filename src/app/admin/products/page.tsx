import AdminProducts from "@/components/admin/AdminProducts";
import AdminProductsHeader from "@/components/admin/AdminProductsHeader";
import SectionTitle from "@/components/panel/SectionTitle";
import OutlineButton from "@/components/shared/ui/OutlineButton";
import Pagination from "@/components/shared/ui/pagination";
import { getProductsForAdmin } from "@/features/products/actions/getProductsForAdmin.actions";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    sort?: string;
    search?: string;
    view?: string;
  }>;
}

export default async function AdminProductsPage({ searchParams }: PageProps) {
  const { page, category, sort, search, view } = await searchParams;
  const currentPage = Number(page) || 1;
  const activeTab = category || "all";
  const selectedSort = sort || "newest";
  const searchQuery = search || "";
  const viewMode = view || "grid";

  const result = await getProductsForAdmin({
    page: currentPage,
    limit: 8,
    category: activeTab,
    sort: selectedSort,
    search: searchQuery,
  });

  const baseUrl = `?category=${activeTab}&sort=${selectedSort}&search=${searchQuery}&view=${viewMode}`;

  return (
    <div>
      <div className="flex mb-2 items-center justify-between">
        <SectionTitle title="مدیریت محصولات" className="mb-0!" />
        <OutlineButton
          href="/admin/products/new"
          className="h-10 shrink-0 px-6 text-center text-base font-medium"
        >
          محصول جدید
        </OutlineButton>
      </div>
      <AdminProductsHeader
        activeTab={activeTab}
        selectedSort={selectedSort}
        searchQuery={searchQuery}
      />
      <AdminProducts
        products={JSON.parse(JSON.stringify(result.products))}
        viewMode={viewMode}
      />
      {result.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={result.totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )}
    </div>
  );
}
