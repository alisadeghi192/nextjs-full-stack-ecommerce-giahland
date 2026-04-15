export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: "indoor" | "decoration" | "gift";
  createdAt: Date;
  liked: number;
  discount: number;
  potDimensions: {
    length: number;
    width: number;
    height: number;
  };
  stock: number;
}
