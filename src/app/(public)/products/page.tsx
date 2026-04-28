import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ProductsHeader from "@/components/features/products/ProductsHeader";
import ProductsList from "@/components/features/products/ProductsList";
import ProductsGrid from "@/components/features/products/ProductsGrid";
import Pagination from "@/components/shared/ui/pagination";
import {
  getAllProducts,
  sortProducts,
  paginateProducts,
  filterProductsByTab
} from "@/features/products/utils/productHelpers";
import { DEFAULT_TAB, DEFAULT_VIEW_MODE, DEFAULT_SORT, PRODUCTS_PER_PAGE } from "@/lib/constants";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const activeTab = (params.category as string) || DEFAULT_TAB;
  const viewMode = (params.view as string) || DEFAULT_VIEW_MODE;
  const selectedSort = (params.sort as string) || DEFAULT_SORT;
  const currentPage = Number(params.page) || 1;

  const allProducts = getAllProducts();
  const filteredProducts = filterProductsByTab(allProducts, activeTab);
  const sortedProducts = sortProducts(filteredProducts, selectedSort);
  const paginatedProducts = paginateProducts(sortedProducts, currentPage, PRODUCTS_PER_PAGE);
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const baseUrl = `?category=${activeTab}&view=${viewMode}&sort=${selectedSort}`;

  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <ProductsHeader />
        {viewMode === DEFAULT_VIEW_MODE ? (
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
