import { blogPosts } from "@/data/blogs";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { MdOutlineAccountCircle, MdOutlineCalendarMonth, MdOutlineRemoveRedEye } from "react-icons/md";
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
      <div className="w-80/100 mx-auto mb-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">   {/* title */}
            روش های نگهداری و کاشت گل فردوس    
          </h1>
          <div className="flex items-center justify-center gap-x-0.5">
            <MdOutlineRemoveRedEye className="text-neutral9 size-5" />
            <span className="text-neutral9 text-sm">تعداد‌ بازدید:1260</span>  {/* views */}
          </div>
        </div>
        <div className="border-neutral3 rounded-xl border p-3 mt-7">
          <Image  
            alt="cover"
            src={"/images/blog-main/blogmain1.jpg"}     
            width={914}
            height={300}
            className=" w-full rounded-2xl "
          /> {/* mainImage */}
          <p className="mt-4 text-justify leading-7.25 text-neutral10">گل فردوس، گیاهی با ظاهری زیبا، مقاوم و ارزان قیمت است. این گیاه را می توان در مکان های مختلف مانند آپارتمان، ادارات و راه پله ها نگهداری کرد. در این مقاله سعی داریم تا با کاشت گل فردوس در گلدان، پرورش و نگهداری گل فردوس، نحوه تکثیر آن و ... بیشتر آشنا شویم. پس با ما همراه باشید.</p>   {/* excerpt */}
          <div className="flex items-center justify-between text-neutral9 text-sm mt-4">
            <span className="flex items-center justify-between"><MdOutlineAccountCircle className="size-5"/> علی صادقی</span> {/* author */}
            <span className="flex items-center justify-between"><MdOutlineCalendarMonth className="size-5"/> 1405/01/20</span>  {/* date */}
          </div>
        </div>
      </div>
    </main>
  );
}
