import { blogPosts } from "@/data/blog";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import ContentRenderer from "@/components/features/blog/ContentRenderer";
import PostHeader from "@/components/features/blog/PostHeader";
import PostMeta from "@/components/features/blog/PostMeta";
import FormField from "@/components/shared/ui/FormField";
import { MdDriveFileRenameOutline } from "react-icons/md";
import TextareaField from "@/components/shared/ui/TextareaField";
import Image from "next/image";

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
        <PostHeader title={post.title} views={post.views} />
        <PostMeta
          title={post.title}
          mainImage={post.mainImage}
          excerpt={post.excerpt}
          author={post.author}
          publishedAt={post.publishedAt}
        />
        <ContentRenderer content={post.content || []} />

        <div className="border-neutral3 mb-4 flex flex-col space-y-4 rounded-xl border p-6">
          <h3 className="font-bold">دیدگاه خود را ثبت کنید.</h3>
          <form className="space-y-4">
            <div className="flex items-center justify-between gap-x-4 gap-y-4 *:w-full max-[576px]:flex-col">
              <FormField
                icon={<MdDriveFileRenameOutline size={22} />}
                type="text"
                name="comment-name"
                label="نام و نام خانوادگی"
              />
              <FormField
                icon={<MdDriveFileRenameOutline size={22} />}
                type="email"
                name="comment-email"
                label="ایمیل"
              />
            </div>
            <TextareaField
              icon={<MdDriveFileRenameOutline size={22} />}
              name="comment-text"
              label="متن دیدگاه"
              rows={3}
            />
            <button
              type="submit"
              className="text-WHITE bg-primary max-xs:w-full hover:bg-shade2 flex h-10 w-47 cursor-pointer items-center justify-center justify-self-end rounded-lg transition-colors"
            >
              ارسال
            </button>
          </form>
        </div>

        <div className="bg-neutral2 flex flex-col space-y-4 rounded-xl p-6 mb-4 ">
          <div className="flex flex-col">
            <div className="border-neutral5 flex items-center gap-x-2 border-b pb-2">
              <div className="shrink-0">
                <Image
                  src="/images/default-user.jpg"
                  alt="user profile"
                  width={44}
                  height={44}
                  className="size-11 rounded-full"
                ></Image>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2.5">
                  <span className="text-neutral10 text-sm/5 font-bold">
                    علی صادقی
                  </span>
                  <span className="bg-neutral3 text-neutral9 h-5 rounded-md px-1 text-xs/5 font-medium">
                    کاربر
                  </span>
                </div>
                <span className="text-neutral8 text-xs">(1405/12/25)</span>
              </div>
            </div>
            <p className="text-neutral9 pt-2 leading-5">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
            </p>
          </div>

          <div className="bg-primary/10 flex flex-col rounded-xl p-6">
            <div className="flex flex-col">
              <div className="border-neutral5 flex items-center gap-x-2 border-b pb-2">
                <div className="shrink-0">
                  <Image
                    src="/images/default-user.jpg"
                    alt="user profile"
                    width={44}
                    height={44}
                    className="size-11 rounded-full"
                  ></Image>
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-center gap-x-2.5">
                    <span className="text-neutral10 text-sm/5 font-bold">
                      علی صادقی
                    </span>
                    <span className="bg-neutral3 text-neutral9 h-5 rounded-md px-1 text-xs/5 font-medium">
                      کاربر
                    </span>
                  </div>
                  <span className="text-neutral8 text-xs">(1405/12/25)</span>
                </div>
              </div>
              <p className="text-neutral9 pt-2 leading-5">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد
                نیاز
              </p>
            </div>
          </div>
        </div>

        <div className="bg-neutral2 flex flex-col space-y-4 rounded-xl p-6 mb-4 ">
          <div className="flex flex-col">
            <div className="border-neutral5 flex items-center gap-x-2 border-b pb-2">
              <div className="shrink-0">
                <Image
                  src="/images/default-user.jpg"
                  alt="user profile"
                  width={44}
                  height={44}
                  className="size-11 rounded-full"
                ></Image>
              </div>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2.5">
                  <span className="text-neutral10 text-sm/5 font-bold">
                    علی صادقی
                  </span>
                  <span className="bg-neutral3 text-neutral9 h-5 rounded-md px-1 text-xs/5 font-medium">
                    کاربر
                  </span>
                </div>
                <span className="text-neutral8 text-xs">(1405/12/25)</span>
              </div>
            </div>
            <p className="text-neutral9 pt-2 leading-5">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
              استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در
              ستون و سطر آنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
