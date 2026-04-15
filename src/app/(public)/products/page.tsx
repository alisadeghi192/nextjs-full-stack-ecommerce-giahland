import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ProductsHeader from "@/components/features/products/ProductsHeader";
import ProductsList from "@/components/features/products/ProductsList";
import ProductsGrid from "@/components/features/products/ProductsGrid";
import Pagination from "@/components/shared/ui/pagination";
import {
  getAllProducts,
  filterByCategory,
  sortProducts,
  paginateProducts,
} from "@/features/products/utils/productHelpers";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const activeTab = (params.category as string) || "all";
  const viewMode = (params.view as string) || "grid";
  const selectedSort = (params.sort as string) || "newest";
  const currentPage = Number(params.page) || 1;
  const allProducts = getAllProducts();
  const filteredProducts = (() => {
    if (activeTab === "all") {
      return allProducts;
    } else if (activeTab === "discounted") {
      return allProducts.filter((p) => p.discount > 0);
    } else {
      return filterByCategory(allProducts, activeTab);
    }
  })();
  const sortedProducts = sortProducts(filteredProducts, selectedSort);
  const pageSize = 12;
  const paginatedProducts = paginateProducts(
    sortedProducts,
    currentPage,
    pageSize,
  );
  const totalPages = Math.ceil(sortedProducts.length / 12);

  const baseUrl = `?category=${activeTab}&view=${viewMode}&sort=${selectedSort}`;
  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <div className="mb-6">
          <ProductsHeader
            activeTab={activeTab}
            viewMode={viewMode}
            selectedSort={selectedSort}
          />
        </div>
        {viewMode === "grid" ? (
          <ProductsGrid products={paginatedProducts} />
        ) : (
          <ProductsList products={paginatedProducts} />
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl={baseUrl}
        />
      </section>
    </main>
  );
}
