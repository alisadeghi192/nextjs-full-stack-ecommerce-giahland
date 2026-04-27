import PublicHeader from "@/components/shared/layout/public/PublicHeader";
import Image from "next/image";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";

export default function NotFound() {
  return (
    <main className="font-modam min-h-dvh">
      <div className="absolute top-0 right-0 left-0">
        <PublicHeader hasSearchInput={false} />
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
          <PrimaryButton
            href="/"
            className="mx-auto mt-5 flex w-9/10 flex-1 py-3"
          >
            بازگشت به صفحه اصلی
          </PrimaryButton>
        </div>
        <Image
          alt="404"
          src="/static/images/404.png"
          width={500}
          height={500}
          className="aspect-square size-100 max-lg:size-100 max-md:size-80 max-sm:size-70"
          priority
        />
      </div>
    </main>
  );
}
