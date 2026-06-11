import { ProductCardData } from "@/features/products/types/product.types";
import { getBulkLikeStatus } from "@/features/user/actions/wishlist.actions";
import ProductCardGrid from "./ProductCardGrid";

interface ProductsGridProps {
  products: ProductCardData[];
}

export default async function ProductsGrid({ products }: ProductsGridProps) {
  const productIds = products.map((product) => product._id);
  const likeStatuses = await getBulkLikeStatus(productIds);
  return (
    <div className="grid grid-cols-4 gap-6 max-[400px]:grid-cols-1! max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-md:gap-4">
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
