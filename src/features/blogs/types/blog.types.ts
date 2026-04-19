export interface BlogPost {
  id: number;
  title: string;
  coverImage: string;
  slug: string;
  date: Date;
  excerpt: string;
  author: string;
  category: "care" | "health" | "propagation";
  views: number;
  publishedAt: Date;
}