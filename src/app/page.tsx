'use client'
import Image from "next/image";
import { FiArrowLeft } from "react-icons/fi";
import CountUp from "react-countup";
export default function Home() {
  return (
    <section className="container">
      <div className="mt-19 flex items-center justify-between">
        <div className="basis-1/2">
          <h1 className="text-BLACK mb-8 text-[40px]/14 font-bold">
            خرید راحت گیاه با،<span className="text-primary">گیاه لند!</span>
          </h1>
          <p className="text-neutral11 mb-8 max-w-134.75 text-[20px]/9">
            با گیاه لند،آنلاین گیاه خودت رو سفارش بده و از تخفیف های ویژه
            استفاده کن.علاوه بر اینها میتونی به صورت رایگان از گیاه پزشک سایت
            مشاوره بگیری.
          </p>
          <div className="mb-12 flex max-w-134.75 gap-x-5.5">
            <button className="bg-primary text-WHITE flex flex-1 cursor-pointer items-center justify-center rounded-xl py-3 text-lg/8">
              گیاهان تخفیف دار
            </button>
            <button className="text-primary border-primary flex max-w-64.5 flex-1 cursor-pointer items-center justify-center gap-x-2 rounded-xl border border-dashed py-3 text-lg">
              <span className="text-lg/8">مشاوره با گیاه پزشک</span>
              <FiArrowLeft className="size-6" />
            </button>
          </div>
          <div className="font-modam flex gap-12">
            <div className="flex basis-1/3 flex-col">
              <span className="text-shade3 text-[32px]/11.25 font-medium">
                {(943).toLocaleString("fa-IR")}+
              </span>
              <span className="text-shade4 text-xl/8 font-normal">
                گیاه خانگی
              </span>
            </div>
            <div className="flex basis-1/3 flex-col">
              <span className="text-shade3 text-[32px]/11.25 font-medium">
                {(234).toLocaleString("fa-IR")}+
              </span>
              <span className="text-shade4 text-xl/8 font-normal">
                گیاه تزئینی
              </span>
            </div>
            <div className="flex basis-1/3 flex-col">
              <span className="text-shade3 text-[32px]/11.25 font-medium">
                {/* {(128).toLocaleString("fa-IR")}+ */}
                <CountUp start={0} end={128} duration={1.5}  formattingFn={(value) => value.toLocaleString('fa-IR')}/>+
              </span>
              <span className="text-shade4 text-xl/8 font-normal">
                گیاه کادویی
              </span>
            </div>
          </div>
        </div>
        <div className="basis-1/2">
          <Image
            alt="giahland"
            src="/hero-desktop.png"
            width={574}
            height={558}
            className="justify-self-end"
          />
        </div>
      </div>
    </section>
  );
}
