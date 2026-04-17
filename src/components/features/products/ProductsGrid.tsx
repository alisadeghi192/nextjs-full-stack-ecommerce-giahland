import ProductCardGrid from "./ProductCardGrid";
import { Product } from "@/features/products/types/product.types";

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-6 max-[400px]:grid-cols-1! max-xl:grid-cols-3 max-md:grid-cols-2 max-md:gap-4">
      {products.map((product) => (
        <ProductCardGrid key={product.id} {...product} />
      ))}
    </div>
  );
}
