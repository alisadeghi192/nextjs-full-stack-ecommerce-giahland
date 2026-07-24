"use client";

import ProductCardGrid from "@/components/features/products/ProductCardGrid";
import ProductCardList from "@/components/features/products/ProductCardList";
import { IProductCardData } from "@/features/products/types/product.types";
import { useIsSidebarOpen } from "@/stores/selectors/ui.selectors";

interface WishlistProductsProps {
  products: IProductCardData[];
  viewMode: string;
}

export default function WishlistProducts({ products, viewMode }: WishlistProductsProps) {
  const isSidebarOpen = useIsSidebarOpen();

  const gridColumns = isSidebarOpen
    ? "grid-cols-[repeat(3,auto)] justify-center max-lg:grid-cols-2"
    : "grid-cols-4 max-xl:grid-cols-3 max-md:grid-cols-[repeat(2,auto)] max-md:justify-center";

  const listColumns = isSidebarOpen
    ? "grid-cols-2 max-xl:grid-cols-1"
    : "grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1";

  if (viewMode === "grid") {
    return (
      <div className={`grid gap-6 ${gridColumns} max-[400px]:grid-cols-1! max-md:gap-4`}>
        {products.map((product) => (
          <ProductCardGrid
            key={product._id}
            {...product}
            isLiked={true} 
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${listColumns} max-sm:grid-cols-1`}>
      {products.map((product) => (
        <ProductCardList
          key={product._id}
          {...product}
          isLiked={true}
        />
      ))}
    </div>
  );
}