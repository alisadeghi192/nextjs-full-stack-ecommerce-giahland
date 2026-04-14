import ProductCardGrid from "./ProductCardGrid";
import { Product } from "@/features/products/types/product.types";

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCardGrid key={product.id} {...product} />
      ))}
    </div>
  );
}