import AboutStatsItem from "@/components/features/about/AboutStatsItem";
import Accordion from "@/components/shared/ui/Accordion";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import { FAQ_ITEMS } from "@/lib/constants";
import Image from "next/image";
import React from "react";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalShipping, MdPestControl } from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";

function page() {
  return (
    <main className="container">
      <Breadcrumb />
      <section className="mt-12 flex gap-x-14 max-lg:items-center max-lg:gap-x-10 max-md:mt-0 max-md:flex-col-reverse">
        <div className="-mt-4 flex flex-col max-md:mt-6 max-md:basis-full">
          <div>
            <h1 className="max-lg:textlg mb-4 text-xl/8 font-bold max-sm:text-lg">
              حال گیاه‌تون رو از ما بپرسید.
            </h1>
            <p className="text-neutral10 text-justify text-xl leading-8 max-xl:text-lg max-lg:text-base/7.25">
              فروشگاه ما صرفاً یک مرکز عرضه گل و گیاه نیست؛ بلکه یک کلینیک تخصصی
              گیاه‌پزشکی است که پیش از هر چیز به فکر سلامت و نجات گیاهان شماست.
              ما به خوبی آگاهیم که مشاهده علائمی همچون زردی برگ‌ها، لکه‌دار شدن
              ساقه، پوسیدگی ریشه یا حمله آفات، برای هر علاقه‌مندی ناامیدکننده و
              نگران‌کننده است. به همین دلیل، تیم مجرب گیاه‌پزشکی ما به صورت
              شبانه‌روزی پشت این صفحه آماده ارائه خدمت است. کافی است تصویری از
              گیاه خود ارسال کنید تا کارشناسان ما با آنالیز دقیق علائم، نوع
              بیماری یا آفت را شناسایی کرده و نسخه درمانی مناسب (شامل نوع سم،
              کود، روش آبیاری یا تعویض خاک) را در سریع‌ترین زمان ممکن در اختیار
              شما قرار دهند.
            </p>
          </div>
          <PrimaryButton
            href="/"
            className="mt-auto h-12 w-full text-lg max-md:mt-6"
          >
            مشاوره با گیاه‌پزشک
          </PrimaryButton>
        </div>
        <div className="relative -mr-4 shrink-0 basis-1/3 max-lg:basis-1/2 max-md:mt-6 max-md:w-70/100 max-sm:w-full">
          <div className="w-full overflow-hidden rounded-xl shadow-[-16px_-16px_0px_0px_rgba(227,247,234)]">
            <Image
              alt="plants"
              src={"/static/images/about-us1.webp"}
              width={372}
              height={405}
              className="aspect-372/405 w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="bg-shade3 max-xs:px-6 max-xs:h-130 mt-10 h-35 rounded-xl px-11.25 max-lg:h-69 max-sm:h-138">
        <div className="max-xs:translate-y-6 grid translate-y-11.25 grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <AboutStatsItem end={943} label="گیاهان نجات داده شده" />
          <AboutStatsItem end={1234} label="مشاوره های موفق" />
          <AboutStatsItem end={4943} label="سفارش‌های ارسال شده" />
          <AboutStatsItem end={9} label="سال سابقه تخصصی تیم ما" />
        </div>
      </section>
      <section className="mt-20">
        <Accordion items={FAQ_ITEMS } />
      </section>
      <section className="mt-10 max-sm:mt-6">
        <h2 className="mb-4 text-lg font-bold">داستان ما</h2>
        <p className="text-neutral10 text-justify leading-7.25">
          «سال‌ها پیش، وقتی یکی از بنیان‌گذاران ما متوجه شد گیاه آپارتمانی‌اش که
          سال‌ها کنارش بود، ناگهان شروع به زرد شدن و ریزش برگ‌ کرده، به هر
          گلفروشی مراجعه کرد اما هیچ‌کس نتوانست تشخیص دقیقی بدهد. بعضی گفتند آب
          زیاد داده، بعضی گفتند نور کم، و برخی هم بدون معاینه، یک سم عمومی
          پیشنهاد کردند. نتیجه؟ گیاه در عرض دو هفته از بین رفت.
          <br /> همان تجربه تلخ، جرقه‌ای شد برای تأسیس مجموعه‌ای که در آن هیچ
          گیاهی بدون معاینه تخصصی نسخه نگیرد. ما دیدیم که در ایران، بازار گل و
          گیاه پر از فروشنده‌های خوب است، اما جای یک مرکز تخصصی گیاه‌پزشکی که
          بتواند بیماری را تشخیص بدهد، درمان را تجویز کند و بعد از فروش نیز
          پشتیبان باشد، خالی است.
          <br /> به همین دلیل، تیمی از فارغ‌التحصیلان رشته گیاه‌پزشکی و علوم
          باغبانی را گرد هم آوردیم تا پلی بین علم و علاقه عمومی ایجاد کنیم.
          امروز، فروشگاه ما نه فقط یک ویترین برای فروش گیاه، بلکه یک درگاه کامل
          خدمات گیاه‌پزشکی است؛ از تشخیص آنلاین بیماری تا فروش تخصصی سموم و کود،
          و از مشاوره حضوری تا پشتیبانی مادام‌العمر برای هر گیاهی که از ما
          خریداری می‌شود.
          <br /> ما آمدیم تا هیچ گیاه‌دوستی تنها نماند و هیچ گیاهی بی‌دلیل از
          بین نرود. این قول ماست.»
        </p>
      </section>
      <div className="border-neutral6 mx-auto mt-10 w-8/10 overflow-hidden rounded-xl border max-lg:w-full max-sm:mt-4">
        <Image
          alt="about-us-pic"
          src={"/static/images/about-us2.webp"}
          width={766}
          height={405}
          className="h-full w-full object-cover"
        />
      </div>
      <section className="mt-10 max-sm:mt-6">
        <h4 className="mb-4 text-lg font-bold">خدمات ما</h4>
        <div className="service-grid grid grid-cols-4 gap-4 max-[510px]:flex max-[510px]:flex-col max-lg:grid-cols-3 max-md:grid-cols-2">
          <div className="flex flex-col gap-y-4 rounded-xl bg-[#E3F7EA] py-6 text-center shadow-lg">
            <FaUserDoctor className="text-primary mx-auto size-8" />
            <span className="text-neutral10 font-medium">
              ویزیت آنلاین و گیاه‌پزشک
            </span>
          </div>
          <div className="flex flex-col gap-y-4 rounded-xl bg-[#E3F7EA] py-6 text-center shadow-lg">
            <RiPlantFill className="text-primary mx-auto size-8" />
            <span className="text-neutral10 font-medium">
              فروش تخصصی گیاهان آپارتمانی
            </span>
          </div>
          <div className="flex flex-col gap-y-4 rounded-xl bg-[#E3F7EA] py-6 text-center shadow-lg">
            <MdPestControl className="text-primary mx-auto size-8" />
            <span className="text-neutral10 font-medium">
              تشخیص آفات و بیماری‌های گیاهی
            </span>
          </div>
          <div className="flex flex-col gap-y-4 rounded-xl bg-[#E3F7EA] py-6 text-center shadow-lg max-lg:col-span-1 max-lg:col-start-2">
            <MdLocalShipping className="text-primary mx-auto size-8" />
            <span className="text-neutral10 font-medium">
              ارسال سریع به سراسر کشور
            </span>
          </div>
        </div>
      </section>
      <div className="mx-auto mt-10 max-sm:mt-6">
        <h5 className="mb-4 text-center text-lg font-bold">
          همین حالا گیاهت رو معاینه کن!
        </h5>
        <PrimaryButton className="max-xs:w-full mx-auto h-12 w-72.5 text-lg">
          مشاوره با گیاه‌پزشک
        </PrimaryButton>
      </div>
    </main>
  );
}

export default page;
