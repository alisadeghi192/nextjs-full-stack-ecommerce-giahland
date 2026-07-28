import ProductsGrid from "@/components/features/products/ProductsGrid";
import ProductsHeader from "@/components/features/products/ProductsHeader";
import ProductsList from "@/components/features/products/ProductsList";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import Pagination from "@/components/shared/ui/Pagination";
import { getProducts } from "@/features/products/actions/getProducts.actions";
import {
  DEFAULT_SORT,
  DEFAULT_TAB,
  DEFAULT_VIEW_MODE,
  PRODUCTS_METADATA,
} from "@/lib/constants";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";

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

const getCachedProducts = (category: string, sort: string, page: number) =>
  unstable_cache(
    async () => getProducts({ category, sort, page }),
    [`products-${category}-${sort}-${page}`],
    { revalidate: 600, tags: ["products"] },
  );

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    view?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const activeTab = params.category || DEFAULT_TAB;
  const viewMode = params.view || DEFAULT_VIEW_MODE;
  const selectedSort = params.sort || DEFAULT_SORT;
  const currentPage = Number(params.page) || 1;

  const result = await getCachedProducts(
    activeTab,
    selectedSort,
    currentPage,
  )();

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
