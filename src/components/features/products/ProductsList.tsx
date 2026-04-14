import ProductCardList from "./ProductCardList";
import { Product } from "@/features/products/types/product.types";

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCardList key={product.id} {...product} />
      ))}
    </div>
  );
}