
import { Comment } from "@/types/comment.types"; 

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

export interface ProductType {
  _id: string;
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
  images: string[];

  features: ProductFeatures;
  cares: ProductCare;

  comments: string[] | Comment[]
}