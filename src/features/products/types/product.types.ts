import { IComment } from "@/features/comments/types/comment.types";
export interface ICareItem {
  title: string;
  description: string;
}

export interface IProductCare {
  light: ICareItem[];
  watering: ICareItem[];
  soil: ICareItem[];
  temperature: ICareItem[];
  fertilization: ICareItem[];
}
export interface IProductFeatures {
  overview: string[];
  appearance: string[];
  warnings: string[];
  propagation: string[];
  summary: string[];
}

export interface IProductSEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface IProductType {
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

  features: IProductFeatures;
  cares: IProductCare;

  seo?: IProductSEO;
  comments?:  IComment[];
}

export interface IProductCardData {
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
