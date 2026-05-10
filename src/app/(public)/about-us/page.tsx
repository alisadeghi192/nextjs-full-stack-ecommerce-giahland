"use client";
import Accordion from "@/components/shared/ui/Accordion";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import Image from "next/image";
import React from "react";
import CountUp from "react-countup";
import { FaUserDoctor } from "react-icons/fa6";
import { MdLocalShipping, MdPestControl } from "react-icons/md";
import { RiPlantFill } from "react-icons/ri";
const faqItems = [
  {
    id: "1",
    title: "چگونه می‌توانم مشکل گیاه خود را با شما در میان بگذارم؟",
    content:
      "بسیار ساده. کافی است از گیاه خود چند عکس واضح (از نمای کلی برگ‌ها، ساقه، زیر برگ‌ها و خاک) بگیرید و از طریق بخش «مشاوره گیاه‌پزشکی» در سایت یا از طریق واتساپ مجموعه ارسال کنید. تیم ما ظرف حداکثر ۲۴ ساعت نظر تخصصی خود را همراه با نسخه درمانی به شما ارائه می‌دهد.",
  },
  {
    id: "2",
    title: "خدمات گیاه‌پزشکی شما رایگان است یا هزینه دارد؟",
    content:
      "مشاوره اولیه و تشخیص مقدماتی بیماری با پرداخت ویزیت انجام می‌شود. در صورت نیاز به معاینه دقیق‌تر، آزمایش خاک، یا ویزیت حضوری (در شهر تهران)، هزینه جداگانه و شفافی اعمال می‌شود که پیش از انجام خدمت به اطلاع شما می‌رسد. تمامی قیمت‌ها در صفحه مربوطه درج شده است.",
  },
  {
    id: "3",
    title: "آیا برای خرید محصولات (سم، کود، خاک) نیاز به مشاوره قبلی دارم؟",
    content:
      "خیر، شما می‌توانید مستقیماً از فروشگاه ما خرید کنید. اما توصیه اکید ما این است که پیش از خرید هر نوع سم یا کود، حتماً با تیم ما مشورت کنید. مصرف نادرست سم می‌تواند به گیاه آسیب جدی وارد کند یا حتی آن را از بین ببرد. مشاوره پیش از خرید رایگان است.",
  },
  {
    id: "4",
    title: " آیا گیاه خریداری شده از شما، ضمانت سلامتی دارد؟",
    content:
      "بله. تمام گیاهان ارسالی ابتدا توسط تیم گیاه‌پزشکی ما معاینه و تأیید می‌شوند و سپس بسته‌بندی و ارسال می‌گردند. در صورت مشاهده هرگونه آفت یا بیماری آشکار در زمان تحویل، ظرف ۲۴ ساعت مشکل را از طریق پشتیبانی پیگیری کنید. ضمانت سلامت گیاه تا ۷ روز پس از تحویل (با رعایت اصول نگهداری توسط مشتری) معتبر است.",
  },
  {
    id: "5",
    title:
      "آیا گیاهانی که سم مصرف کرده‌اند برای انسان و حیوانات خانگی خطرناک است؟",
    content:
      "سوال بسیار مهمی است. ما تا حد امکان از روش‌های مبارزه بیولوژیک (استفاده از حشرات مفید یا قارچ‌های آنتاگونیست) و سموم کم‌خطر و ارگانیک استفاده می‌کنیم. اما در موارد خاص و آلودگی شدید، ممکن است از سموم شیمیایی با دوز کنترل شده استفاده شود. در این موارد، هشدارهای لازم در مورد دور نگه داشتن کودکان و حیوانات خانگی به صورت شفاف درج و به شما اطلاع داده می‌شود.",
  },
  {
    id: "6",
    title: "چگونه بفهمم گیاه من به آفت مبتلا شده یا مشکل تغذیه دارد؟",
    content:
      "دقیقاً همین جا است که تخصص ما به کار می‌آید. بسیاری از علائم (مثل زردی یا لکه‌دار شدن برگ) هم می‌تواند نشانه کمبود مواد مغذی باشد، هم نشانه حمله آفت یا قارچ. تیم گیاه‌پزشکی ما با بررسی دقیق علائم، تشخیص افتراقی می‌دهد و به شما می‌گوید دقیقاً مشکل از چیست. توصیه می‌کنم خودسرانه از سم استفاده نکنید.",
  },
];

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
              src={"/static/images/about-us1.jpg"}
              width={372}
              height={405}
              className="aspect-372/405 w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="bg-shade3 max-xs:px-6 max-xs:h-130 mt-10 h-35 rounded-xl px-11.25 max-lg:h-69 max-sm:h-138">
        <div className="max-xs:translate-y-6 grid translate-y-11.25 grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
          <div className="flex h-31.5 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl">
            <span className="text-shade3 text-[32px]/11.25 font-medium">
              <CountUp
                start={0}
                end={943}
                duration={1.5}
                formattingFn={(value) => value.toLocaleString("fa-IR")}
              />
              +
            </span>
            <span className="text-shade4 leading-7.25">
              گیاهان نجات داده شده
            </span>
          </div>
          <div className="flex h-31.5 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl">
            <span className="text-shade3 text-[32px]/11.25 font-medium">
              <CountUp
                start={0}
                end={1234}
                duration={1.5}
                formattingFn={(value) => value.toLocaleString("fa-IR")}
              />
              +
            </span>
            <span className="text-shade4 leading-7.25">مشاوره های موفق</span>
          </div>
          <div className="flex h-31.5 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl">
            <span className="text-shade3 text-[32px]/11.25 font-medium">
              <CountUp
                start={0}
                end={4943}
                duration={1.5}
                formattingFn={(value) => value.toLocaleString("fa-IR")}
              />
              +
            </span>
            <span className="text-shade4 leading-7.25">
              سفارش های ارسال شده
            </span>
          </div>
          <div className="flex h-31.5 flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl">
            <span className="text-shade3 text-[32px]/11.25 font-medium">
              <CountUp
                start={0}
                end={9}
                duration={1.5}
                formattingFn={(value) => value.toLocaleString("fa-IR")}
              />
              +
            </span>
            <span className="text-shade4 leading-7.25">سال سابقه تخصصی ما</span>
          </div>
        </div>
      </section>
      <section className="mt-20">
        <Accordion items={faqItems} />
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
          src={"/test/66.png"}
          width={766}
          height={405}
          className="h-full w-full object-cover"
        />
      </div>
      <section className="mt-10 max-sm:mt-6">
        <h4 className="mb-4 text-lg font-bold">خدمات ما</h4>
        <div className="service-grid grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[510px]:flex max-[510px]:flex-col gap-4 ">
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
      <div className="mt-10 max-sm:mt-6 mx-auto ">
        <h5 className="font-bold text-lg text-center mb-4">همین حالا گیاهت رو معاینه کن!</h5>
       <PrimaryButton className="text-lg h-12 w-72.5 mx-auto max-xs:w-full">
        مشاوره با گیاه‌پزشک
       </PrimaryButton>
      </div>
    </main>
  );
}

export default page;
