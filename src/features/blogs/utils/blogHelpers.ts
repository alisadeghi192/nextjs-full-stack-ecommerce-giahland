import { blogPosts } from "@/data/blogs";
import { BlogPost } from "../types/blog.types";

export const getAllPosts = (): BlogPost[] => {
  return blogPosts;
};

export const filterPostsByCategory = (posts: BlogPost[], category: string) => {
  if (category === "all") return posts;
  return posts.filter((post) => post.category === category);
};

export const sortPosts = (posts: BlogPost[], sortBy: string) => {
  switch (sortBy) {
    case "newest":
      return [...posts].sort(
        (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
      );
    case "oldest":
      return [...posts].sort(
        (a, b) => a.publishedAt.getTime() - b.publishedAt.getTime()
      );
    case "most_viewed":
      return [...posts].sort((a, b) => b.views - a.views);
    default:
      return posts;
  }
};

export const paginatePosts = (
  posts: BlogPost[],
  page: number,
  pageSize: number = 12
) => {
  const start = (page - 1) * pageSize;
  return posts.slice(start, start + pageSize);
};


export const getLatestPosts = (count: number = 5): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, count);
};

export const getMostViewedPosts = (count: number = 5): BlogPost[] => {
  return [...blogPosts]
    .sort((a, b) => b.views - a.views)
    .slice(0, count);
};