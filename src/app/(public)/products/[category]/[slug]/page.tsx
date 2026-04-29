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

interface ProductPageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

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

      <section className="mb-10 flex items-end gap-x-8">
        <div className="flex basis-220 items-end justify-center gap-x-6">
          {/* gallery */}
          <div className="flex max-h-124 basis-89 flex-col items-center justify-center gap-y-4">
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
            <div className="flex justify-between gap-x-3 *:cursor-pointer">
              <div className="border-neutral6 rounded-lg border p-1">
                <Image
                  width={70}
                  height={70}
                  src={product.image}
                  alt="babaadam"
                  className="aspect-square object-cover"
                />
              </div>{" "}
              <div className="border-neutral6 rounded-lg border p-1">
                <Image
                  width={70}
                  height={70}
                  src={product.image}
                  alt="babaadam"
                  className="aspect-square object-cover"
                />
              </div>{" "}
              <div className="border-neutral6 rounded-lg border p-1">
                <Image
                  width={70}
                  height={70}
                  src={product.image}
                  alt="babaadam"
                  className="aspect-square object-cover"
                />
              </div>{" "}
              <div className="border-neutral6 rounded-lg border p-1">
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
          <div className="flex basis-125 flex-col">
            {/* header */}
            <div className="border-neutral7 mb-7 flex flex-col gap-y-4 border-b pb-4">
              <span className="text-primary leading-5.5 font-medium">
                نهال و گیاهان {categoryName}
              </span>
              <h2 className="text-neutral12 text-xl font-semibold">
                گیاه طبیعی {product.name}
              </h2>
            </div>
            {/* infos */}
            <div>
              <span className="mb-4 inline-block text-lg/8 font-semibold">
                ویژگی ها
              </span>
              <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">جنس گلدان</span>
                  <span className="text-BLACK leading-7.25">پلاستیکی</span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">خاک گیاه</span>
                  <span className="text-BLACK leading-7.25">
                    خاک گلدانی شنی و غنی
                  </span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">وزن</span>
                  <span className="text-BLACK leading-7.25">4000 گرم</span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">ابعاد</span>
                  <span className="text-BLACK leading-7.25">۲۵x۲۵x۸۰</span>
                </div>
                <div className="bg-neutral3 flex basis-9/5 flex-col gap-y-1 rounded-lg px-3 py-1.5">
                  <span className="text-neutral9 text-sm/6.25">
                    وضعیت نسبت به آفتاب
                  </span>
                  <span className="text-BLACK leading-7.25">آفتاب دوست</span>
                </div>
                <div className="text-primary mx-auto flex h-10 cursor-pointer items-center gap-x-2 self-end">
                  <span className="text-sm/6.25 font-medium">
                    مشاهده همه ویژگی ها
                  </span>
                  <MdKeyboardArrowDown className="size-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* card */}
        <div className="border-neutral7 basis-78 rounded-2xl border px-6 py-7.75">
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
          className="border-tint7 space-y-6 border-b border-dashed py-6 scroll-mt-25"
        >
          <div className="space-y-4">
            <div className="space-y-2">
              <h5 className="leading-7.25 font-bold">
                معرفی کلی گیاه {product.name}
              </h5>
              <p className="text-neutral10 text-justify leading-7.25">
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
              <h5 className="leading-7.25 font-bold">ویژگی های ظاهری</h5>
              <div className="text-neutral10 text-justify leading-7.25">
                <ul className="text-neutral10 max-xs:text-sm/6.25 list-disc pr-6 text-justify leading-7.25">
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
              <h5 className="leading-7.25 font-bold">نکات ویژه و هشدارها</h5>
              <div className="text-neutral10 text-justify leading-7.25">
                <ol className="text-neutral10 max-xs:text-sm/6.25 list-decimal pr-6 text-justify leading-7.25">
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
              <h5 className="leading-7.25 font-bold">تکثیر {product.name}</h5>
              <div className="text-neutral10 text-justify leading-7.25">
                <ol className="text-neutral10 max-xs:text-sm/6.25 list-decimal pr-6 text-justify leading-7.25">
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
              <h5 className="leading-7.25 font-bold">جمع بندی</h5>
              <p className="text-neutral10 text-justify leading-7.25">
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
        <div id="cares"></div>
      </section>
    </main>
  );
}
