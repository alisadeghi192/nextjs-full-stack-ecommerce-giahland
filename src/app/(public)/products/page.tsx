import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ProductsHeader from "@/components/features/products/ProductsHeader";
import ProductsList from "@/components/features/products/ProductsList";
import ProductsGrid from "@/components/features/products/ProductsGrid";

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
          <ProductsGrid products={indoorPlants} />
        ) : (
          <ProductsList products={indoorPlants} />
        )}
      </section>
    </main>
  );
}
