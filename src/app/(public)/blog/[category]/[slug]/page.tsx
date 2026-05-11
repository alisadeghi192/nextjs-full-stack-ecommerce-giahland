import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ContentRenderer from "@/components/features/blog/ContentRenderer";
import PostHeader from "@/components/features/blog/PostHeader";
import PostMeta from "@/components/features/blog/PostMeta";
import CommentForm from "@/components/shared/ui/CommentForm";
import CommentList from "@/components/shared/ui/CommentList";
import BlogSlider from "@/components/features/blog/BlogSlider";

interface BlogPostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;

  const post = blogPosts.find(
    (post) => post.category === category && post.slug === slug,
  );

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts
    .filter((p) => p.category === category && p.slug !== slug)
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
    .slice(0, 4);

  const categoryLink = `/blog?category=${category}&sort=newest`;

  return (
    <main className="container">
      <Breadcrumb title={post.title} />
      <div className="mx-auto mt-10 w-80/100 max-lg:w-full max-md:mt-8 max-sm:mt-4">
        <PostHeader title={post.title} views={post.views} />
        <PostMeta
          title={post.title}
          mainImage={post.mainImage}
          excerpt={post.excerpt}
          author={post.author}
          publishedAt={post.publishedAt}
        />
        <ContentRenderer content={post.content || []} />

        <CommentForm />

        <CommentList comments={post.comments} />

        <BlogSlider
          link={categoryLink}
          title="مقالات مرتبط"
          posts={relatedPosts}
        />
      </div>
    </main>
  );
}
