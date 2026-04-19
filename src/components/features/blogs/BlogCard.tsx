import Link from "next/link";
import { MdOutlineAccountCircle, MdOutlineCalendarMonth } from "react-icons/md";

interface BlogCardProps {
  title: string;
  coverImage: string;
  slug?: string;
  date?: Date;
  excerpt?: string;
  author ?: string;
}

export default function BlogCard({
  title,
  coverImage,
  slug = "/",
  date,
  excerpt,
  author
}: BlogCardProps) {
  return (
    <>
      <div className="text-WHITE overflow-hidden rounded-xl justify-self-center">
        <Link href={slug}>
          <div
            className="relative flex h-94.5 max-xs:h-80 max-w-72 flex-col justify-between bg-cover bg-center p-4 rounded-xl overflow-hidden"
            style={{ backgroundImage: `url(${coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/60 "></div>
            <div className="from-primary absolute inset-0  bg-linear-to-b to-[#75E59B] opacity-30"></div>
            <div className="border-WHITE z-10 flex h-full flex-col  justify-between border-b pb-4">
              <h5 className="line-clamp-4 max-xs:line-clamp-3 text-xl/7 font-semibold max-sm:text-lg">{title}</h5>
              <p className="mt-auto line-clamp-5 max-xs:line-clamp-4 leading-5.5">{excerpt}</p>
            </div>
            <div className="flex items-center justify-between z-10 mt-4 max-[600px]:flex-col gap-y-2 max-xs:text-xs">
              <span className="flex items-center text-sm justify-center gap-x-0.5 self-start max-xs:text-xs">
                <MdOutlineAccountCircle className="size-5"/>
                {author}
              </span>
              <span className="flex items-center text-sm justify-center gap-x-0.5 self-start max-xs:text-xs">
                <MdOutlineCalendarMonth className="size-5"/>
                {date?.toLocaleDateString('fa-IR')}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
