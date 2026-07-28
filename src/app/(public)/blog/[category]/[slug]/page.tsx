import BlogSlider from "@/components/features/blog/BlogSlider";
import ContentRenderer from "@/components/features/blog/ContentRenderer";
import PostHeader from "@/components/features/blog/PostHeader";
import PostMeta from "@/components/features/blog/PostMeta";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import CommentForm from "@/components/shared/ui/CommentForm";
import CommentList from "@/components/shared/ui/CommentList";
import { getArticleBySlug } from "@/features/blog/actions/getArticleBySlug.actions";
import { getArticles } from "@/features/blog/actions/getArticles.actions";
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";
interface BlogPostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const getCachedArticle = (slug: string) =>
  unstable_cache(async () => getArticleBySlug(slug), [`article-${slug}`], {
    revalidate: 3600,
    tags: ["article"],
  });

const getCachedRelatedArticles = (category: string, slug: string) =>
  unstable_cache(
    async () => {
      const { articles } = await getArticles({
        category,
        limit: 6,
        page: 1,
      });
      return articles.filter((a) => a.slug !== slug);
    },
    [`related-articles-${category}-${slug}`],
    { revalidate: 600, tags: ["related-articles"] },
  );

// ========== SEO ==========
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getCachedArticle(slug)();

  if (!post) {
    return { title: "مقاله یافت نشد" };
  }

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.seo?.title || post.title,
      description: post.seo?.description || post.excerpt,
      images: post.seo?.ogImage || post.mainImage,
      type: "article",
      publishedTime: new Date(post.publishedAt || post.createdAt).toISOString(),
      authors: [`${post.author.firstName} ${post.author.lastName}`],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;

  const post = await getCachedArticle(slug)();

  const relatedPosts = await getCachedRelatedArticles(category, slug)();

  const categoryLink = `/blog?category=${category}&sort=newest`;
  const articleAuthor = `${post.author.firstName} ${post.author.lastName}`;
  return (
    <section className="container">
      <Breadcrumb title={post.title} />
      <div className="mx-auto mt-10 w-80/100 max-lg:w-full max-md:mt-8 max-sm:mt-4">
        <PostHeader title={post.title} views={post.views} />
        <PostMeta
          title={post.title}
          mainImage={post.mainImage}
          excerpt={post.excerpt}
          author={articleAuthor}
          publishedAt={post.publishedAt}
        />
        <ContentRenderer content={post.content || []} />

        <CommentForm
          targetType="blog"
          targetCategory={post.category}
          targetId={post._id}
          targetSlug={post.slug}
        />

        <CommentList comments={post.comments || []} />

        <Suspense
          fallback={
            <div className="mt-16">
              <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-4/5 w-full animate-pulse rounded-xl bg-gray-200"
                  />
                ))}
              </div>
            </div>
          }
        >
          <BlogSlider
            link={categoryLink}
            title="مقالات مرتبط"
            posts={relatedPosts}
          />
        </Suspense>
      </div>
    </section>
  );
}
