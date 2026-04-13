import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ProductsHeader from "@/components/features/products/ProductsHeader";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const activeTab = (params.category as string) || "indoor";
  const viewMode = (params.view as string) || "grid";
  const selectedSort = (params.sort as string) || "newest";

  return (
    <main className="container">
      <Breadcrumb />
      <section>
        <ProductsHeader
          activeTab={activeTab}
          viewMode={viewMode}
          selectedSort={selectedSort}
        />
      </section>
    </main>
  );
}
