import { toPersianNumber } from "@/lib/utils/format";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface PostHeaderProps {
  title: string;
  views: number;
}

export default function PostHeader({ title, views }: PostHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-y-2">
      <h1 className="text-3xl font-semibold max-lg:text-2xl max-sm:text-xl">
        {title}
      </h1>
      <div className="mr-auto flex items-center justify-center gap-x-0.5">
        <span className="text-neutral9 dark:text-text-dark transition-colors text-sm">
          تعداد بازدید: {toPersianNumber(views)}
        </span>
        <MdOutlineRemoveRedEye className="text-neutral9 dark:text-text-dark transition-colors size-5" />
      </div>
    </div>
  );
}