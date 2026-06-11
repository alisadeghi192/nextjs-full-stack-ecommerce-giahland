import { ProductCardData } from "@/features/products/types/product.types";
import { getBulkLikeStatus } from "@/features/user/actions/wishlist.actions";
import ProductCardList from "./ProductCardList";

interface ProductsListProps {
  products: ProductCardData[];
}

export default async function ProductsList({ products }: ProductsListProps) {
  const productIds = products.map((product) => product._id);
  const likeStatuses = await getBulkLikeStatus(productIds);
  return (
    <div className="grid grid-cols-3 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
      {products.map((product) => (
        <ProductCardList
          key={product._id}
          {...product}
          isLiked={likeStatuses[product._id]}
        />
      ))}
    </div>
  );
}
