"use client";
import Image from "next/image";
import CountUp from "react-countup";
import {
  MdOutlineArrowBack,
  MdOutlineLocalShipping,
  MdOutlinePayment,
  MdOutlineVerified,
} from "react-icons/md";
export default function Home() {
  return (
    <section className="container">
      <div className="mt-19 flex items-center justify-between max-xl:gap-x-10 max-md:mt-15 max-md:flex-col-reverse">
        <div className="basis-1/2 max-md:mt-10">
          <h1 className="text-BLACK mb-8 text-[40px]/14 font-bold max-lg:mb-4 max-lg:text-3xl max-md:text-center max-md:text-2xl/7 max-md:font-semibold max-sm:text-xl/7">
            خرید راحت گیاه با،<span className="text-primary">گیاه لند!</span>
          </h1>
          <p className="text-neutral11 mb-8 max-w-134.75 text-[20px]/9 max-lg:mb-4 max-lg:text-base max-md:mb-6 max-md:text-center max-md:text-base/6.25 max-sm:text-sm">
            با گیاه لند،آنلاین گیاه خودت رو سفارش بده و از تخفیف های ویژه
            استفاده کن.علاوه بر اینها میتونی به صورت رایگان از گیاه پزشک سایت
            مشاوره بگیری.
          </p>
          <div className="mb-12 flex max-w-134.75 gap-x-5.5 max-lg:flex-col max-lg:gap-y-2 max-md:mb-10 max-md:flex-row max-md:gap-x-3">
            <button className="bg-primary text-WHITE flex flex-1 cursor-pointer items-center justify-center rounded-xl py-3 max-md:basis-1/2 max-md:py-2">
              <span className="text-lg/8 max-md:text-sm max-md:font-medium">
                گیاهان تخفیف دار
              </span>
            </button>
            <button className="text-primary border-primary flex max-w-134.75 flex-1 cursor-pointer items-center justify-center gap-x-2 rounded-xl border border-dashed py-3 text-lg max-md:basis-1/2 max-md:py-2">
              <span className="text-lg/8 max-md:text-sm max-md:font-medium">
                مشاوره با گیاه پزشک
              </span>
              <MdOutlineArrowBack className="size-6 max-md:size-4" />
            </button>
          </div>
          <div className="font-modam flex gap-x-12 max-md:gap-x-2">
            <div className="flex basis-1/3 flex-col gap-y-1 max-md:text-center">
              <span className="text-shade3 text-[32px]/11.25 font-medium max-md:text-2xl/8.5 max-md:font-normal">
                <CountUp
                  start={0}
                  end={943}
                  duration={1.5}
                  formattingFn={(value) => value.toLocaleString("fa-IR")}
                />
                +
              </span>
              <span className="text-shade4 text-xl/8 font-normal max-lg:text-base">
                گیاه خانگی
              </span>
            </div>
            <div className="flex basis-1/3 flex-col gap-y-1 max-md:text-center">
              <span className="text-shade3 text-[32px]/11.25 font-medium max-md:text-2xl/8.5 max-md:font-normal">
                <CountUp
                  start={0}
                  end={234}
                  duration={1.5}
                  formattingFn={(value) => value.toLocaleString("fa-IR")}
                />
                +
              </span>
              <span className="text-shade4 text-xl/8 font-normal max-lg:text-base">
                گیاه تزئینی
              </span>
            </div>
            <div className="flex basis-1/3 flex-col gap-y-1 max-md:text-center">
              <span className="text-shade3 text-[32px]/11.25 font-medium max-md:text-2xl/8.5 max-md:font-normal">
                <CountUp
                  start={0}
                  end={128}
                  duration={1.5}
                  formattingFn={(value) => value.toLocaleString("fa-IR")}
                />
                +
              </span>
              <span className="text-shade4 text-xl/8 font-normal max-lg:text-base">
                گیاه کادویی
              </span>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <picture>
            <source media="(max-width: 768px)" srcSet="/hero-mobile.png" />
            <Image
              alt="giahland"
              src="/hero-desktop.png"
              width={574}
              height={558}
              className="justify-self-end"
              priority
            />
          </picture>
        </div>
      </div>

      <div className="mt-15 flex w-full items-center justify-center gap-x-20 max-md:mt-3 max-md:flex-col">
        <div className="basis-1/3 text-center max-md:mt-7">

          <div className="bg-bg-service mb-2 flex size-20 max-sm:size-18 items-center justify-center justify-self-center rounded-full ">
            <MdOutlinePayment className="text-primary size-10 max-sm:size-8" />
          </div>
          <h5 className="text-neutral12 mb-1 text-xl/7 font-semibold max-sm:font-medium max-sm:text-base/5.5">
            پرداخت درب منزل
          </h5>
          <p className="text-neutral11 line-clamp-4 text-sm/6.25 max-sm:text-[12px]/5.5">
            برای ایجاد اطمینان خاطر مشتریان،علاوه بر پرداخت آنلاین امکان پرداخت
            درب منزل وجود دارد.
          </p>
        </div>

        <div className="basis-1/3 text-center max-md:mt-7">
          <div className="bg-bg-service mb-2 flex size-20 max-sm:size-18 items-center justify-center justify-self-center rounded-full ">
            <MdOutlineVerified className="text-primary size-10 max-sm:size-8" />
          </div>
          <h5 className="text-neutral12 mb-1 text-xl/7 font-semibold max-sm:font-medium max-sm:text-base/5.5">
            ضمانت محصول
          </h5>
          <p className="text-neutral11 line-clamp-4 text-sm/6.25 max-sm:text-[12px]/5.5">
            به مدت دو هفته پس از دریافت محصول در صورت وجود مشکل میتوانید مرجوع
            کنید.
          </p>
        </div>

        <div className="basis-1/3 text-center max-md:mt-7">
          <div className="bg-bg-service mb-2 flex size-20 max-sm:size-18 items-center justify-center justify-self-center rounded-full ">
            <MdOutlineLocalShipping className="text-primary size-10 max-sm:size-8" />
          </div>
          <h5 className="text-neutral12 mb-1 text-xl/7 font-semibold max-sm:font-medium max-sm:text-base/5.5">
            تحویل درب منزل
          </h5>
          <p className="text-neutral11 line-clamp-4 text-sm/6.25 max-sm:text-[12px]/5.5">
            با ایجاد آدرس منزل خود در پروفایل کاربری،محصول خود را درب منزل تحویل
            بگیرید.
          </p>
        </div>

      </div>
    </section>
  );
}
