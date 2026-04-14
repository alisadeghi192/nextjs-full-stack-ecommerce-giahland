import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ProductsHeader from "@/components/features/products/ProductsHeader";
import ProductsList from "@/components/features/products/ProductsList";
import ProductsGrid from "@/components/features/products/ProductsGrid";
import Pagination from "@/components/shared/ui/pagination";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
function paginateProducts(
  products: any[],
  page: number,
  pageSize: number = 12,
) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return products.slice(start, end);
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const indoorPlants = [
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/Succulent.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/Succulent.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },
    {
      name: "گیاه طبیعی بابا آدم",
      price: 852000,
      image: "/images/Houseplant/BabaAdam.png",
      slug: "/",
    },

  ];

  const activeTab = (params.category as string) || "indoor";
  const viewMode = (params.view as string) || "grid";
  const selectedSort = (params.sort as string) || "newest";
  const currentPage = Number(params.page) || 1;
  const products = paginateProducts(indoorPlants, currentPage, 12);
  const totalPages = Math.ceil(indoorPlants.length / 12);
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
          <ProductsGrid products={products} />
        ) : (
          <ProductsList products={products} />
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
