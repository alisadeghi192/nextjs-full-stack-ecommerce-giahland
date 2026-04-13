import ProductCardList from "./ProductCardList";

interface Product {
  name: string;
  price: number;
  image: string;
  slug?:string;
}

interface ProductsListProps {
  products: Product[];
}

export default function ProductsList({ products }: ProductsListProps) {
  return (
    <div className="grid grid-cols-2 gap-6">
      {products.map((product) => (
        <ProductCardList key={product.name} {...product} />
      ))}
    </div>
  );
}