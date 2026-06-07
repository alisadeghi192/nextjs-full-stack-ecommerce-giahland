import ProductCardList from "./ProductCardList";
import { ProductType } from "@/features/products/types/product.types";

interface ProductsListProps {
  products: ProductType[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid grid-cols-3 gap-6 max-xl:grid-cols-2 max-sm:grid-cols-1">
      {products.map((product) => (
        <ProductCardList key={product._id} {...product} />
      ))}
    </div>
  );
}
