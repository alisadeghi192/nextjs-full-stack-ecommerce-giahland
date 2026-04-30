import { notFound } from "next/navigation";
import Breadcrumb from "@/components/shared/ui/Breadcrumb";
import { fakeProducts } from "@/data/products";
import Image from "next/image";
import LikeButton from "@/components/features/products/LikeButton";
import { productTabs } from "@/lib/constants";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdOutlineChangeCircle } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { formatPrice } from "@/lib/utils/format";
import PrimaryButton from "@/components/shared/ui/PrimaryButton";
import ProductDetailTabs from "@/components/features/products/ProductDetailTabs";
import { productDetailTabs } from "@/lib/constants";
import Link from "next/link";
import CommentForm from "@/components/shared/ui/CommentForm";
import CommentList from "@/components/shared/ui/CommentList";
import { Comment } from "@/types/comment.types";

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

const comments : Comment[] = [
  {
    id: 1,
    name: "سارا محمدی",
    role: "user",
    date: new Date("2025-04-20"),
    text: "بسیار عالی. من همیشه در آبیاری زیاده‌روی می‌کردم و گیاهام پوسیده می‌شد. با خوندن این مقاله فهمیدم مشکل کجاست. ممنون.",
    reply: {
      name: "مریم احمدی",
      role: "admin",
      date: new Date("2025-04-20"),
      text: "خوشحالم که براتون مفید بوده. امیدوارم گیاهانتون همیشه شاداب باشن 🌱",
    },
  },
  {
    id: 2,
    name: "رضا کریمی",
    role: "user",
    date: new Date("2025-04-19"),
    text: "آیا گیاه سانسوریا هم به همین روش آبیاری نیاز داره؟ چون شنیدم مقاومه.",
    reply: {
      name: "دکتر محمدی",
      role: "plant-doctor",
      date: new Date("2025-04-19"),
      text: "سانسوریا به خشکی مقاومه. بین دو آبیاری حتماً بذارید خاک کاملاً خشک بشه. معمولاً هر ۲-۳ هفته یکبار کافیه.",
    },
  },
  {
    id: 3,
    name: "نرگس احمدی",
    role: "user",
    date: new Date("2025-04-18"),
    text: "دمای آب چقدر باید باشه؟",
    reply: {
      name: "مریم احمدی",
      role: "admin",
      date: new Date("2025-04-18"),
      text: "دمای اتاق (۲۰-۲۵ درجه). آب سرد باعث شوک به ریشه میشه.",
    },
  },
  {
    id: 4,
    name: "علی رضایی",
    role: "user",
    date: new Date("2025-04-17"),
    text: "برای گیاه پتوس چقدر آبیاری کافیه؟",
    reply: {
      name: "دکتر محمدی",
      role: "plant-doctor",
      date: new Date("2025-04-17"),
      text: "پتوس当 سطح خاک خشک شد آبیاری کنید. معمولاً هفته‌ای ۱-۲ بار.",
    },
  },
  {
    id: 5,
    name: "زهرا موسوی",
    role: "user",
    date: new Date("2025-04-16"),
    text: "آیا میشه گیاه رو با آب جوشیده خنک شده آبیاری کرد؟",
    reply: {
      name: "مریم احمدی",
      role: "admin",
      date: new Date("2025-04-16"),
      text: "بله عالیه. آب جوشیده کلر و املاح اضافی نداره.",
    },
  },
  {
    id: 6,
    name: "مجید حسینی",
    role: "user",
    date: new Date("2025-04-15"),
    text: "آبیاری شب بهتره یا صبح؟",
    reply: {
      name: "دکتر محمدی",
      role: "plant-doctor",
      date: new Date("2025-04-15"),
      text: "صبح بهترین زمانه. برگها تا شب خشک میشن و خطر قارچ کمتره.",
    },
  },
  {
    id: 7,
    name: "فاطمه نوری",
    role: "user",
    date: new Date("2025-04-14"),
    text: "بسیار عالی. همیشه فکر میکردم هرچه بیشتر آب بدم بهتره.",
    reply: {
      name: "مریم احمدی",
      role: "admin",
      date: new Date("2025-04-14"),
      text: "بله، این یه باور غلطه. آبیاری بیش از حد عامل اصلی مرگ گیاهانه.",
    },
  },
  {
    id: 8,
    name: "حسین رستمی",
    role: "user",
    date: new Date("2025-04-13"),
    text: "برای کاکتوس هم همینطوره؟",
    reply: {
      name: "دکتر محمدی",
      role: "plant-doctor",
      date: new Date("2025-04-13"),
      text: "کاکتوس به آبیاری خیلی کم نیاز داره. در زمستان تا ۲ ماه یکبار کافیه.",
    },
  },
  {
    id: 9,
    name: "لیلا صادقی",
    role: "user",
    date: new Date("2025-04-12"),
    text: "آب تصفیه شده بهتره یا آب معمولی؟",
    reply: {
      name: "مریم احمدی",
      role: "admin",
      date: new Date("2025-04-12"),
      text: "آب تصفیه شده یا آب باران بهترین گزینه هستن.",
    },
  },
  {
    id: 10,
    name: "امیر قاسمی",
    role: "user",
    date: new Date("2025-04-11"),
    text: "چه علائمی نشون دهنده تشنگی گیاهه؟",
    reply: {
      name: "دکتر محمدی",
      role: "plant-doctor",
      date: new Date("2025-04-11"),
      text: "پژمردگی برگها، خاک خشک و گلدون سبک از علائم تشنگی هستند.",
    },
  },
  // ۱۰ کامنت بدون پاسخ
  {
    id: 11,
    name: "نگار کاظمی",
    role: "user",
    date: new Date("2025-04-10"),
    text: "ممنون از اطلاعات عالیتون. همیشه دنبال چنین مقاله‌ای بودم.",
  },
  {
    id: 12,
    name: "پویا نوروزی",
    role: "user",
    date: new Date("2025-04-09"),
    text: "مقاله خوبی بود. کاش زودتر خونده بودم.",
  },
  {
    id: 13,
    name: "شیدا رحیمی",
    role: "user",
    date: new Date("2025-04-08"),
    text: "دمای آب چقدر باید باشه؟ تو مقاله اشاره کردین ولی عدد دقیقشو بگید.",
  },
  {
    id: 14,
    name: "مهدی کمالی",
    role: "user",
    date: new Date("2025-04-07"),
    text: "آیا میتونم گیاه رو با آب استخر آبیاری کنم؟",
  },
  {
    id: 15,
    name: "سارا جعفری",
    role: "user",
    date: new Date("2025-04-06"),
    text: "مقاله‌تون رو برای دوستام میفرستم. خیلی مفید بود.",
  },
  {
    id: 16,
    name: "حمید عزیزی",
    role: "user",
    date: new Date("2025-04-05"),
    text: "برای بونسای هم همین روش مناسبه؟",
  },
  {
    id: 17,
    name: "مریم شکوری",
    role: "user",
    date: new Date("2025-04-04"),
    text: "مفید بود. ممنون از وقتی که گذاشتید.",
  },
  {
    id: 18,
    name: "علیرضا نادری",
    role: "user",
    date: new Date("2025-04-03"),
    text: "آبیاری با آب ولرم بهتره یا آب سرد؟",
  },
  {
    id: 19,
    name: "زهرا احمدی",
    role: "user",
    date: new Date("2025-04-02"),
    text: "خیلی عالی. نکات جدیدی یاد گرفتم.",
  },
  {
    id: 20,
    name: "رضا علیپور",
    role: "user",
    date: new Date("2025-04-01"),
    text: "کاش در مورد آبیاری گیاهان گلدار هم مطلب می‌نوشتید.",
  },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { category, slug } = await params;

  const product = fakeProducts.find(
    (p) => p.category === category && p.slug === slug,
  );

  if (!product) {
    notFound();
  }

  const categoryName = productTabs.find((p) => p.id == category)?.label;

  const hasDiscount = product.discount > 0;

  return (
    <main className="container">
      <Breadcrumb title={product.name} />

      <section className="mb-10 flex items-end justify-between max-xl:flex-wrap max-xl:items-center max-xl:justify-around max-lg:justify-between max-sm:mb-8 max-md:items-end max-sm:flex-col">
        {/* header */}
        <div className="border-neutral7 mb-7 hidden w-full flex-col gap-y-4 border-b pb-4 max-xl:flex max-sm:mb-8 max-sm:gap-y-2 max-sm:pb-2">
          <span className="text-primary leading-5.5 font-medium max-sm:text-sm/5">
            نهال و گیاهان {categoryName}
          </span>
          <h2 className="text-neutral12 text-xl font-semibold max-sm:text-base/5.5">
            گیاه طبیعی {product.name}
          </h2>
        </div>
        {/* gallery */}
        <div className="flex w-89 flex-col items-center justify-center gap-y-4 max-xl:mx-20 max-xl:basis-40/100 max-lg:mx-auto max-sm:w-full">
          {/* big pic */}
          <div className="relative aspect-square w-full cursor-pointer overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
            <LikeButton className="top-4 right-4" />
          </div>
          {/* thumbnails */}
          <div className="flex justify-between gap-x-3 *:cursor-pointer max-[400px]:gap-x-2">
            <div className="border-neutral6 size-20 rounded-lg border p-1 max-[400px]:size-17.5">
              <Image
                width={70}
                height={70}
                src={product.image}
                alt="babaadam"
                className="aspect-square object-cover"
              />
            </div>
            <div className="border-neutral6 size-20 rounded-lg border p-1 max-[400px]:size-17.5">
              <Image
                width={70}
                height={70}
                src={product.image}
                alt="babaadam"
                className="aspect-square object-cover"
              />
            </div>
            <div className="border-neutral6 size-20 rounded-lg border p-1 max-[400px]:size-17.5">
              <Image
                width={70}
                height={70}
                src={product.image}
                alt="babaadam"
                className="aspect-square object-cover"
              />
            </div>
            <div className="border-neutral6 size-20 rounded-lg border p-1 max-[400px]:size-17.5">
              <Image
                width={70}
                height={70}
                src={product.image}
                alt="babaadam"
                className="aspect-square object-cover"
              />
            </div>
          </div>
        </div>
        {/* details */}
        <div className="flex w-125 flex-col max-xl:mt-9 max-lg:w-100 max-md:w-65 max-sm:mt-6 max-sm:w-full">
          {/* header */}
          <div className="border-neutral7 mb-7 flex flex-col gap-y-4 border-b pb-4 max-xl:hidden">
            <span className="text-primary leading-5.5 font-medium">
              نهال و گیاهان {categoryName}
            </span>
            <h2 className="text-neutral12 text-xl font-semibold">
              گیاه طبیعی {product.name}
            </h2>
          </div>
          {/* infos */}
          <div>
            <span className="mb-4 inline-block text-lg/8 font-semibold max-sm:mb-2 max-sm:text-base/7.25">
              ویژگی ها
            </span>
            {/* detail boxes */}
            <div className="border-neutral6 grid grid-cols-2 gap-x-6 gap-y-10 max-md:grid-cols-1 max-md:gap-y-2.25 max-sm:gap-y-2 max-sm:border-b max-sm:pb-4">
              <div className="border-tint2 flex flex-col gap-y-1 rounded-lg border border-dashed bg-white px-3 py-1.5">
                <span className="text-neutral9 text-sm/6.25">جنس گلدان</span>
                <span className="text-BLACK leading-7.25 max-sm:text-sm/6.25">
                  پلاستیکی
                </span>
              </div>
              <div className="border-tint2 flex flex-col gap-y-1 rounded-lg border border-dashed bg-white px-3 py-1.5">
                <span className="text-neutral9 text-sm/6.25">خاک گیاه</span>
                <span className="text-BLACK leading-7.25 max-sm:text-sm/6.25">
                  خاک گلدانی شنی و غنی
                </span>
              </div>
              <div className="border-tint2 flex flex-col gap-y-1 rounded-lg border border-dashed bg-white px-3 py-1.5">
                <span className="text-neutral9 text-sm/6.25">وزن</span>
                <span className="text-BLACK leading-7.25 max-sm:text-sm/6.25">
                  4000 گرم
                </span>
              </div>
              <div className="border-tint2 flex flex-col gap-y-1 rounded-lg border border-dashed bg-white px-3 py-1.5">
                <span className="text-neutral9 text-sm/6.25">ابعاد</span>
                <span className="text-BLACK leading-7.25 max-sm:text-sm/6.25">
                  ۲۵x۲۵x۸۰
                </span>
              </div>
              <div className="border-tint2 flex flex-col gap-y-1 rounded-lg border border-dashed bg-white px-3 py-1.5">
                <span className="text-neutral9 text-sm/6.25">
                  وضعیت نسبت به آفتاب
                </span>
                <span className="text-BLACK leading-7.25 max-sm:text-sm/6.25">
                  آفتاب دوست
                </span>
              </div>
              <div className="text-primary mx-auto flex h-10 cursor-pointer items-center gap-x-2 self-end max-md:hidden max-sm:flex">
                <Link href={"#features"} className="text-sm/6.25 font-medium">
                  مشاهده همه ویژگی ها
                </Link>
                <MdKeyboardArrowDown className="size-6" />
              </div>
            </div>
          </div>
        </div>
        {/* card */}
        <div className="border-neutral7 max-xs:w-full max-sm:self-center w-78 rounded-2xl border px-6 py-7.75 max-xl:mt-9 max-sm:mt-8">
          <div className="space-y-2 border-b pb-6">
            <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
              <MdOutlineChangeCircle className="text-shade1 size-7.5" />
              <span className="text-neutral9 text-sm/6 font-medium">
                7 روز ضمانت بازگشت کالا
              </span>
            </div>
            <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
              <BiSupport className="text-shade1 size-7.5" />
              <span className="text-neutral9 text-sm/6 font-medium">
                پشتیبانی 24 ساعته
              </span>
            </div>
            <div className="bg-neutral3 flex items-center gap-x-3 rounded-xl p-3">
              <AiOutlineDollarCircle className="text-shade1 size-7.5" />
              <span className="text-neutral9 text-sm/6 font-medium">
                ضمانت بهترین قیمت
              </span>
            </div>
          </div>

          <div className="my-6 flex items-center justify-between">
            <span className="leading-7.25">قیمت:</span>
            <span className="text-xl/9">{formatPrice(product.price)} </span>
          </div>

          <PrimaryButton className="h-12 w-full text-lg/8">
            افزودن به سبد خرید
          </PrimaryButton>
        </div>
      </section>

      <section>
        <ProductDetailTabs tabs={productDetailTabs} />
        <div
          id="features"
          className="border-tint7 scroll-mt-35 max-xl:scroll-mt-25 max-md:scroll-mt-37 space-y-6 border-b border-dashed py-6 text-justify leading-7.25"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="font-bold">معرفی کلی گیاه {product.name}</h5>
              <p className="text-neutral10 max-xs:text-sm/6.25">
                یوکا سرده‌ای از گیاهان همیشه‌سبز و شبیه به درختچه یا درخت است که
                بومی مناطق گرم و خشک آمریکای شمالی، آمریکای مرکزی و کارائیب
                می‌باشد. این گیاه عضوی از خانواده مارچوبگان (Asparagaceae) و
                زیرخانواده آگاووئیدها (Agavoideae) است.
                <br />
                نام علمی رایج: Yucca (گونه‌های مختلف مانند Yucca gigantea, Yucca
                elephantipes, Yucca aloifolia)
                <br />
                نام‌های انگلیسی: Yucca, Spineless Yucca (یوکای بدون تیغ), Cane
                Yucca (یوکای نیشکر)
              </p>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold">ویژگی های ظاهری</h5>
              <div className="text-neutral10 max-xs:text-sm/6.25">
                <ul className="list-disc pr-6">
                  <li>
                    ساقه:دارای ساقه‌ای چوبی و ضخیم (شبیه به پای فیل) که در برخی
                    گونه‌ها به ارتفاع چند متر می‌رسد.
                  </li>
                  <li>
                    برگ‌ها:بلند، باریک، شمشیری شکل و نوک تیز (در برخی گونه‌ها
                    بسیار تیز و خطرناک). برگ‌ها به صورت دسته‌ای از بالای ساقه
                    بیرون می‌آیند.
                  </li>
                  <li>
                    رنگ برگ:سبز تیره، سبز مایل به آبی، یا ابلق (سبز با حاشیه زرد
                    یا سفید).
                  </li>
                  <li>
                    گل: در طبیعت، یوکا گل‌های زنگوله‌ای شکل، سفید یا کرم رنگ به
                    صورت خوشه‌ای عمودی و بسیار معطر تولید می‌کند. اما در شرایط
                    آپارتمانی به ندرت گل می‌دهد.
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold">نکات ویژه و هشدارها</h5>
              <div className="text-neutral10 max-xs:text-sm/6.25">
                <ol className="list-decimal pr-6">
                  <li>
                    سمی بودن: یوکا برای گربه، سگ و اسب سمی است. ساپونین موجود در
                    گیاه می‌تواند باعث استفراغ، اسهال و ترشح بزاق در حیوانات
                    خانگی شود. دور از دسترس حیوانات نگهداری کنید.
                  </li>
                  <li>
                    تیغ‌های خطرناک: در گونه‌هایی مانند Yucca aloifolia، نوک
                    برگ‌ها بسیار تیز است و می‌تواند پوست را سوراخ کند. هنگام
                    جابجایی دستکش بپوشید.
                  </li>
                  <li>
                    تصفیه هوا: یوکا یکی از گیاهان مؤثر در جذب ترکیبات آلی فرار
                    (مانند فرمالدئید، بنزن و تری کلرواتیلن) است. (طبق مطالعه
                    ناسا)
                  </li>
                </ol>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold">تکثیر {product.name}</h5>
              <div className="text-neutral10 max-xs:text-sm/6.25">
                <ol className="list-decimal pr-6">
                  <li>
                    قلمه ساقه:برش ۱۰-۲۰ سانتی‌متری از ساقه، خشک کردن سطح برش به
                    مدت ۲ روز، کاشت در ماسه مرطوب.
                  </li>
                  <li>پاجوش:جدا کردن پاجوش‌های اطراف گیاه مادری در بهار.</li>
                  <li>بذر: زمان‌بر و تخصصی، نیاز به دمای ۲۰-۲۵ درجه.</li>
                </ol>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-bold">جمع بندی</h5>
              <p className="text-neutral10 max-xs:text-sm/6.25">
                یوکا گیاهی صبور، کم‌توقع و زیبا است که با ساقه ضخیم و تاجی از
                برگ‌های شمشیری شکل، جلوهای مدرن و گرمسیری به خانه می‌بخشد. تنها
                کلید موفقیت با آن، خشک نگه داشتن خاک بین دو آبیاری و نور کافی
                است. اگر اهل آبیاری زیاد هستید، این گیاه برای شما مناسب نیست،
                اما اگر به دنبال گیاهی مقاوم و ماندگار می‌گردید، یوکا انتخابی
                عالی است.
              </p>
            </div>
            <div className="border-neutral4 mx-auto mt-10 w-fit overflow-hidden rounded-2xl border">
              <Image
                alt="pro"
                src={product.image}
                width={360}
                height={360}
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div
          id="cares"
          className="border-tint7 scroll-mt-25 max-md:scroll-mt-37 max-sm:scroll-mt-35 space-y-2 border-b border-dashed py-6 text-justify leading-7.25"
        >
          <h5 className="font-bold">شرایط نگهداری (مخصوص آپارتمان)</h5>
          <div className="text-neutral10 max-xs:text-sm/6.25">
            <ol className="list-decimal pr-6">
              <li>
                نور
                <ul className="list-disc pr-6">
                  <li>نیاز: نور غیرمستقیم و روشن تا آفتاب مستقیم.</li>
                  <li>بهترین مکان: کنار پنجره جنوبی یا غربی.</li>
                  <li>
                    توجه: کمبود نور باعث کشیدگی ساقه (اتولاسیون)، رنگ پریدگی و
                    ریزش برگ‌های پایینی می‌شود.
                  </li>
                </ul>
              </li>
              <li>
                آبیاری
                <ul className="list-disc pr-6">
                  <li>
                    قانون طلایی: اجازه دهید خاک بین دو آبیاری کاملاً خشک شود.
                  </li>
                  <li>
                    دفعات: در بهار و تابستان هر ۱۰-۱۴ روز یک بار، در پاییز و
                    زمستان هر ۳-۴ هفته یک بار.
                  </li>
                  <li>
                    نکته مهم: یوکا به غرقابی بسیار حساس است و سریع دچار پوسیدگی
                    ریشه می‌شود.
                  </li>
                </ul>
              </li>
              <li>
                خاک
                <ul className="list-disc pr-6">
                  <li>ترکیب مناسب: خاک سبک با زهکشی عالی</li>
                  <li>
                    ۲ قسمت خاک باغچه + ۱ قسمت ماسه شسته + ۱ قسمت پرلیت یا پوکه
                  </li>
                  <li>یا استفاده از خاک کاکتوس و ساکولنت آماده</li>
                  <li>گلدان: حتماً دارای زهکشی (سوراخ کف) باشد.</li>
                </ul>
              </li>
              <li>
                دما و رطوبت
                <ul className="list-disc pr-6">
                  <li>دمای ایده‌آل: ۱۸ تا ۲۶ درجه سانتی‌گراد</li>
                  <li>
                    حداکثر تحمل سرما: برخی گونه‌ها تا ۱۰- درجه (در فضای باز)،
                    اما گونه آپارتمانی زیر ۱۰ درجه آسیب می‌بیند.
                  </li>
                  <li>
                    رطوبت: نیاز به رطوبت بالا ندارد؛ هوای خشک منزل را تحمل
                    می‌کند. غبارپاشی گاهی برای تمیزی برگ‌ها کافیست.
                  </li>
                </ul>
              </li>{" "}
              <li>
                کوددهی
                <ul className="list-disc pr-6">
                  <li>زمان: در فصل رشد (بهار و تابستان)، هر ۴-۶ هفته یک بار</li>
                  <li>
                    نوع کود: کود متعادل مخصوص گیاهان آپارتمانی (۲۰-۲۰-۲۰) یا کود
                    مخصوص کاکتوس، نصف غلظت توصیه شده.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>
      </section>
      <CommentForm />
      <CommentList comments={comments} />
    </main>
  );
}
