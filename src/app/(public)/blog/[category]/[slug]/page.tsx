import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import {
  MdOutlineAccountCircle,
  MdOutlineCalendarMonth,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import Image from "next/image";
import ContentRenderer from "@/components/features/blog/ContentRenderer";
import { formatDate, toPersianNumber } from "@/lib/utils/format";

interface BlogPostPageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = params;

  const post = blogPosts.find(
    (post) => post.category === category && post.slug === slug,
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="container">
      <Breadcrumb title={post?.title} />
      <div className="mx-auto mt-10 w-80/100 max-lg:w-full max-md:mt-8 max-sm:mt-4">
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <h1 className="text-3xl font-semibold max-lg:text-2xl max-sm:text-xl">
            {post.title}
          </h1>
          <div className="mr-auto flex items-center justify-center gap-x-0.5">
            <MdOutlineRemoveRedEye className="text-neutral9 size-5" />
            <span className="text-neutral9 text-sm">
              تعداد بازدید: {toPersianNumber(post.views)}
            </span>
          </div>
        </div>
        <div className="border-neutral3 mt-7 rounded-xl border p-3 shadow-lg max-sm:mt-4">
          <Image
            alt={post.title}
            src={post.mainImage}
            width={914}
            height={300}
            className="w-full rounded-2xl"
          />
          <p className="text-neutral10 mt-4 text-justify leading-7.25 max-sm:text-sm/6.25">
            {post.excerpt}
          </p>
          <div className="text-neutral9 mt-4 flex items-center justify-between text-sm">
            <span className="flex items-center justify-between gap-1">
              <MdOutlineAccountCircle className="size-5" /> {post.author}
            </span>
            <span className="flex items-center justify-between gap-1">
              <MdOutlineCalendarMonth className="size-5" />{" "}
              {formatDate(new Date(post.publishedAt))}
            </span>
          </div>
        </div>

        <ContentRenderer content={post.content || []} />
      </div>
    </main>
  );
}
