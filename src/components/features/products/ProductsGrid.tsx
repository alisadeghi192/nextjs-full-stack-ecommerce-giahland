import ProductCardGrid from "./ProductCardGrid";

interface Product {
  name: string;
  price: number;
  image: string;
  slug? : string
}

interface ProductsGridProps {
  products: Product[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCardGrid key={product.name} {...product} />
      ))}
    </div>
  );
}