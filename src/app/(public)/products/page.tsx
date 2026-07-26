import ProductsGrid from "@/components/features/products/ProductsGrid";
import ProductsHeader from "@/components/features/products/ProductsHeader";
import ProductsList from "@/components/features/products/ProductsList";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import Pagination from "@/components/shared/ui/Pagination";
import { getProducts } from "@/features/products/actions/getProducts.actions";
import { DEFAULT_SORT, DEFAULT_TAB, DEFAULT_VIEW_MODE, PRODUCTS_METADATA } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: PRODUCTS_METADATA.title,
  description: PRODUCTS_METADATA.description,
  keywords: PRODUCTS_METADATA.keywords,
  openGraph: {
    title: PRODUCTS_METADATA.title,
    description: PRODUCTS_METADATA.description,
    images: "/static/images/logo.webp",
  },
};

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

  const result = await getProducts({
    category: activeTab,
    sort: selectedSort,
    page: currentPage,
  });

  const baseUrl = `?category=${activeTab}&view=${viewMode}&sort=${selectedSort}`;

  return (
    <main className="container">
      <Breadcrumb />
      <ProductsHeader
        activeTab={activeTab}
        selectedSort={selectedSort}
        viewMode={viewMode}
      />
      {viewMode === DEFAULT_VIEW_MODE ? (
        <ProductsGrid products={result.products} />
      ) : (
        <ProductsList products={result.products} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={result.totalPages}
        baseUrl={baseUrl}
      />
    </main>
  );
}
