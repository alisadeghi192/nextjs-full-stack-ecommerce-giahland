export interface BlogPostType {
  id: number;
  title: string;
  coverImage: string;
  slug: string;
  date: Date;
  excerpt: string;
  author: string;
  category: "care" | "health" | "intro";
  views: number;
  publishedAt: Date;
}