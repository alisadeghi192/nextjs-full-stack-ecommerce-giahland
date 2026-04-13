import Image from "next/image";
import Link from "next/link";
import {
  RiInstagramFill,
  RiMapPin2Fill,
  RiTelegram2Fill,
} from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-neutral2 max-xs:mt-16 mt-20 pt-7 pb-10">
      <div className="container flex justify-between items-baseline max-xl:gap-12 max-sm:flex-col-reverse">
        <div className="flex basis-124 max-sm:basis-full flex-col gap-x-10 max-sm:gap-x-4">
          <div className="flex flex-col gap-y-6 max-lg:gap-y-4 max-md:gap-y-3">
            <h4 className="text-primary text-2xl/8.5 font-bold max-md:text-xl max-xs:text-base max-xs:font-medium">
              گیاه لند
            </h4>
            <p className="text-neutral10 text-justify leading-7.25 max-md:text-sm/6 max-xs:text-[12px]">
              گیاه لند سعی بر این دارد با ارائه خدمات نوین در حوزه فروش گیاهان
              باعث راحتی شما در خرید انواع گیاه شود.تنوع گیاهان و همچنین ایجاد
              بستری مناسب برای مشاوره با گیاه پزشک از دیگر مزیت های گیاه لند
              میباشد.
            </p>
          </div>
          <div className="flex items-center justify-between mt-10 max-xl:mt-8">
            <div className="flex flex-col gap-y-4">
              <p className="text-neutral10 text-xl max-md:text-base">
                تلفن پشتیبانی : ۰۹۳۷۱۹۲۱۱۹۹
              </p>
              <div className="flex gap-x-6">
                <RiMapPin2Fill className="text-neutral10 size-6 cursor-pointer" />
                <RiTelegram2Fill className="text-neutral10 size-6 cursor-pointer" />
                <RiInstagramFill className="text-neutral10 size-6 cursor-pointer" />
              </div>
            </div>
            <Image
              alt="license"
              src="/images/license1.png"
              height={76}
              width={76}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex basis-150 max-sm:basis-auto max-sm:w-full items-center justify-between">
          <div className="flex basis-46 flex-col gap-y-2 max-xl:basis-40 max-sm:w-1/3">
            <h5 className="text-neutral10 pb-2 border-b border-Border text-xl/7 max-md:text-base max-xs:text-[12px] font-semibold">
              آپارتمانی
            </h5>
            <div className="flex flex-col gap-y-2">
              <Link href="/" className="text-neutral10 text-xl/9 max-md:text-base max-xs:text-[12px]">
                بابا آدم
              </Link>
              <Link href="/" className="text-neutral10 text-xl/9 max-md:text-base max-xs:text-[12px]">
                یوکا
              </Link>
              <Link href="/" className="text-neutral10 text-xl/9 max-md:text-base max-xs:text-[12px]">
                سانسوریا
              </Link>
            </div>
          </div>
          <div className="flex basis-46 flex-col gap-y-2 max-xl:basis-40 max-sm:w-1/3">
            <h5 className="text-neutral10 pb-2 max-md:text-base border-b border-Border max-xs:text-[12px] text-xl/7 font-semibold">
              تزئینی
            </h5>
            <div className="flex flex-col gap-y-2">
              <Link href="/" className="text-neutral10 text-xl/9 max-md:text-base max-xs:text-[12px]">
                یشم
              </Link>
              <Link href="/" className="text-neutral10 text-xl/9 max-md:text-base max-xs:text-[12px]">
                کراسولا
              </Link>
              <Link href="/" className="text-neutral10 text-xl/9 max-md:text-base max-xs:text-[12px]">
                بونسای پاچیرا
              </Link>
            </div>
          </div>
          <div className="flex basis-46 flex-col gap-y-2 max-xl:basis-40 max-sm:w-1/3">
            <h5 className="text-neutral10 pb-2 max-md:text-base max-xs:text-[12px] border-b border-Border text-xl/7 font-semibold">
              کادویی
            </h5>
            <div className="flex flex-col gap-y-2">
              <Link href="/" className="text-neutral10 text-xl/9 max-xs:text-[12px] max-md:text-base">
                آنتوریم
              </Link>
              <Link href="/" className="text-neutral10 text-xl/9 max-xs:text-[12px] max-md:text-base">
                بونسای
              </Link>
              <Link href="/" className="text-neutral10 text-xl/9 max-xs:text-[12px] max-md:text-base">
                بنت قنسول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}