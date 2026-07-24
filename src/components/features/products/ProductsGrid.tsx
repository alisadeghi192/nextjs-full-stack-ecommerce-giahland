import { IProductCardData } from "@/features/products/types/product.types";
import { getBulkLikeStatus } from "@/features/user/actions/wishlist.actions";
import ProductCardGrid from "./ProductCardGrid";

interface ProductsGridProps {
  products: IProductCardData[];
}

export default async function ProductsGrid({ products }: ProductsGridProps) {
  const productIds = products.map((product) => product._id);
  const likeStatuses = await getBulkLikeStatus(productIds);
  return (
    <div className="max-[400px]:grid-cols-[repeat(1,auto)]! grid grid-cols-[repeat(4,auto)] justify-center gap-6 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4 max-sm:grid-cols-[repeat(2,auto)]">
      {products.map((product) => (
        <ProductCardGrid
          key={product._id}
          {...product}
          isLiked={likeStatuses[product._id]}
        />
      ))}
    </div>
  );
}
