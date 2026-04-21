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
  content?: {
    type: string;
    data: {
      text?: string;
      src?: string;
      alt?: string;
      caption?: string;
    };
  }[];
}