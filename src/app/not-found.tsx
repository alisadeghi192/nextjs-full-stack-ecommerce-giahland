import Link from "next/link";
import PublicHeader from "@/components/layout/public/PublicHeader";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="font-modam min-h-dvh">
      <div className="absolute top-0 right-0 left-0">
        <PublicHeader />
      </div>
      <div className="flex min-h-dvh basis-1/2 items-center justify-center px-4 text-center max-sm:flex-col-reverse">
        <div>
          <h1 className="text-primary text-8xl font-black max-sm:text-5xl">
            ۴۰۴
          </h1>
          <h2 className="text-neutral11 mt-5 text-2xl font-semibold max-sm:text-xl">
            صفحه مورد نظر یافت نشد.
          </h2>
          <p className="text-neutral9 mt-3 max-w-120">
            متأسفیم! صفحه‌ای که به دنبال آن هستید وجود ندارد یا ممکن است حذف شده
            باشد.
          </p>
          <Link
            href="/"
            className="bg-primary text-WHITE mx-auto mt-5 flex w-9/10 flex-1 cursor-pointer items-center justify-center rounded-xl py-3 transition-colors hover:bg-shade2"
          >
            <span className="text-lg/8 max-md:text-sm max-md:font-medium">
              بازگشت به صفحه اصلی
            </span>
          </Link>
        </div>
        <Image
          alt="404"
          src="/images/404.png"
          width={500}
          height={500}
          className="aspect-square max-lg:size-100 max-md:size-80"
        />
      </div>
    </main>
  );
}
