// src/features/products/types/product.types.ts

export interface CareItem {
  title: string;
  description: string;
}

export interface ProductCare {
  light: CareItem[];
  watering: CareItem[];
  soil: CareItem[];
  temperature: CareItem[];
  fertilization: CareItem[];
}

export interface ProductType {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: "indoor" | "decoration" | "gift";
  createdAt: Date;
  liked: number;
  discount: number;
  stock: number;

  potMaterial: string;
  soilType: string;
  weight: number;
  potDimensions: {
    length: number;
    width: number;
    height: number;
  };
  sunlight: string;
  images?: string[];

  features: {
    overview: string[];
    appearance: string[];
    warnings: string[];
    propagation: string[];
    summary: string[];
  };

  cares: ProductCare;
}