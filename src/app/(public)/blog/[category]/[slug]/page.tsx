import BlogSlider from "@/components/features/blog/BlogSlider";
import ContentRenderer from "@/components/features/blog/ContentRenderer";
import PostHeader from "@/components/features/blog/PostHeader";
import PostMeta from "@/components/features/blog/PostMeta";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import CommentForm from "@/components/shared/ui/CommentForm";
import CommentList from "@/components/shared/ui/CommentList";
import { getArticleBySlug } from "@/features/blog/actions/getArticleBySlug.actions";
import { getArticles } from "@/features/blog/actions/getArticles.actions";

interface BlogPostPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;

  const post = await getArticleBySlug(slug);

  const { articles: relatedPosts } = await getArticles({
    category: category,
    limit: 4,
    page: 1,
  });

  const filteredRelated = relatedPosts.filter((p) => p._id !== post._id);

  const categoryLink = `/blog?category=${category}&sort=newest`;
  const articleAuthor = `${post.author.firstName} ${post.author.lastName}`;

  return (
    <main className="container">
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

        <CommentForm />

        <CommentList comments={post.comments || []} />

        <BlogSlider
          link={categoryLink}
          title="مقالات مرتبط"
          posts={filteredRelated}
        />
      </div>
    </main>
  );
}
