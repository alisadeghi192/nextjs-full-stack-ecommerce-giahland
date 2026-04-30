import { Comment } from "@/types/comment.types";

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

export interface BlogPostType {
  id: number;
  title: string;
  coverImage: string;
  mainImage: string;
  slug: string;
  date: Date;
  excerpt: string;
  author: string;
  category: "care" | "health" | "intro";
  views: number;
  publishedAt: Date;
  content?: ContentBlock[];
  comments?: Comment[];   
}