
import { IComment } from "@/features/comments/types/comment.types";
import { Types } from "mongoose";

export type ContentBlock =
  | {
      type: "paragraph";
      data: {
        text: string;
      };
    }
  | {
      type: "image";
      data: {
        src: string;
        alt: string;
        caption?: string;
      };
    }
  | {
      type: "heading";
      data: {
        text: string;
        level?: 1 | 2 | 3 | 4;
      };
    }
  | {
      type: "bulletList";
      data: {
        items: string[];
      };
    }
  | {
      type: "orderedList";
      data: {
        items: string[];
      };
    };

export interface IBlogPost {
  _id: string;
  title: string;
  coverImage: string;
  mainImage: string;
  slug: string;
  excerpt: string;
  author: Types.ObjectId | string; 
  category: "care" | "health" | "styling";
  views: number;
  publishedAt: Date;
  content: ContentBlock[];
  comments: Types.ObjectId[] | string[];
  seo?: {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogPostWithDetails {
  _id: string;
  title: string;
  coverImage: string;
  mainImage: string;
  slug: string;
  excerpt: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    role:  "plant-doctor" | "admin";
  };
  category: "care" | "health" | "styling";
  views: number;
  publishedAt: Date;
  content: ContentBlock[];
  comments: IComment[]; 
  seo?: {
    title: string;
    description: string;
    keywords?: string[];
    ogImage?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IBlogPostCard {
  _id: string;
  title: string;
  coverImage: string;
  slug: string;
  excerpt: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  category: "care" | "health" | "styling";
  publishedAt: Date;
  usedInSlider?:boolean
}