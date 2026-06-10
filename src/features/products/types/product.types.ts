import { IComment } from "@/types/comment.types";
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
export interface ProductFeatures {
  overview: string[];
  appearance: string[];
  warnings: string[];
  propagation: string[];
  summary: string[];
}

export interface ProductSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: "indoor" | "decoration" | "gift";
  createdAt: Date;
  updatedAt: Date;
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
  images: string[];

  features: ProductFeatures;
  cares: ProductCare;

  seo?: ProductSEO;
  comments?:  IComment[];
}

export interface ProductCardData {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
  discount: number;
  potDimensions: { length: number; width: number; height: number };
  stock: number;
  liked: number;
  createdAt: Date;
}
