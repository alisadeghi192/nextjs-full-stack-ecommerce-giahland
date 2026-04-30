import { CareItem } from '@/features/products/types/product.types'
import { ProductCare } from '@/features/products/types/product.types'
import { ProductType } from '@/features/products/types/product.types'
import { Comment } from '@/types/comment.types'

export const fakeProducts: ProductType[] = [
  {
    id: "indoor-1",
    name: "بابا آدم",
    price: 1850000,
    image: "/static/images/HousePlant/BabaAdam.png",
    slug: "baba-adam",
    category: "indoor",
    createdAt: new Date("2024-01-15"),
    liked: 128,
    discount: 0,
    stock: 12,

    potMaterial: "پلاستیکی",
    soilType: "سبک و غنی",
    weight: 2100,
    potDimensions: { length: 22, width: 22, height: 24 },
    sunlight: "نور غیرمستقیم",
    images: ["/static/images/HousePlant/BabaAdam.png", "/static/images/HousePlant/eighthFlower.png", "/static/images/HousePlant/eleventhFlower.png", "/static/images/HousePlant/fifteenthFlower.png"],

    features: {
      overview: [
        "بابا آدم با نام علمی Alocasia amazonica، گیاهی است گرمسیری با برگ‌های بزرگ، پهن و قلبی شکل که رگبرگ‌های برجسته و سفیدرنگی دارند.",
        "این گیاه بومی جنگل‌های بارانی جنوب شرقی آسیا است و در محیطی گرم و مرطوب به بهترین شکل رشد می‌کند."
      ],
      appearance: [
        "برگ‌ها: قلبی یا پیکانی شکل با رگبرگ‌های سفید.",
        "ساقه: بلند و محکم.",
        "اندازه: تا ۹۰ سانتی‌متر.",
        "گل: در آپارتمان نادر است."
      ],
      warnings: [
        "سمی بودن: برای انسان و حیوانات سمی است.",
        "حساسیت به آبیاری: غرقابی باعث پوسیدگی ریشه می‌شود.",
        "حساسیت به دما: دمای زیر ۱۵ درجه آسیب می‌زند."
      ],
      propagation: [
        "تقسیم بوته: بهترین روش در بهار.",
        "قلمه ساقه: کاشت در خاک سبک و مرطوب."
      ],
      summary: [
        "بابا آدم با برگ‌های هنرمندانه‌اش، یک انتخاب عالی برای دکوراسیون داخلی است.",
        "با نور غیرمستقیم و آبیاری اصولی، سال‌ها طراوت را به خانه شما هدیه می‌دهد."
      ]
    },

    cares: {
      light: [
        { title: "نیاز نوری", description: "نور غیرمستقیم و روشن، دور از نور مستقیم آفتاب." }
      ],
      watering: [
        { title: "آبیاری", description: "خاک همیشه مرطوب باشد، اما خیس نه. اجازه دهید سطح خاک خشک شود." }
      ],
      soil: [
        { title: "خاک مناسب", description: "خاک سبک، غنی و دارای زهکشی عالی." }
      ],
      temperature: [
        { title: "دما و رطوبت", description: "۱۸ تا ۲۷ درجه، رطوبت بالا را ترجیح می‌دهد." }
      ],
      fertilization: [
        { title: "کوددهی", description: "هر ماه یک بار در فصل رشد، نصف غلظت توصیه شده." }
      ]
    }
  },
  {
    id: "indoor-2",
    name: "یوکا",
    price: 3240000,
    image: "/static/images/HousePlant/secondFlower.png",
    slug: "yucca",
    category: "indoor",
    createdAt: new Date("2024-02-20"),
    liked: 95,
    discount: 0,
    stock: 8,

    potMaterial: "پلاستیکی یا سفالی",
    soilType: "ماسه و پرلیت",
    weight: 4500,
    potDimensions: { length: 28, width: 28, height: 30 },
    sunlight: "نور زیاد تا مستقیم",
    images: ["/static/images/HousePlant/BabaAdam.png", "/static/images/HousePlant/eighthFlower.png", "/static/images/HousePlant/eleventhFlower.png", "/static/images/HousePlant/fifteenthFlower.png"],

    features: {
      overview: [
        "یوکا با نام علمی Yucca elephantipes، گیاهی است چوبی و شبیه به درختچه که ظاهری مجسمه‌ای مدرن به دکور می‌بخشد.",
        "یوکا گیاهی بسیار مقاوم و کم‌توقع است و برای افراد پرمشغله گزینه‌ای ایده‌آل است."
      ],
      appearance: [
        "برگ‌ها: شمشیری، سخت، کشیده و نوک‌تیز.",
        "ساقه: چوبی و ضخیم.",
        "گل: در آپارتمان بسیار نادر است.",
        "رشد: کند و تدریجی."
      ],
      warnings: [
        "نوک برگ‌ها تیز است: هنگام جابجایی احتیاط کنید.",
        "آبیاری زیاد: مهم‌ترین خطر، پوسیدگی ریشه است."
      ],
      propagation: [
        "قلمه ساقه: در بهار یا اوایل تابستان.",
        "پاجوش: جدا کردن ساقه‌های فرعی."
      ],
      summary: [
        "اگر به دنبال گیاهی مقاوم با ظاهری امروزی هستید، یوکا گزینه‌ای عالی است.",
        "با نور کافی و آبیاری محدود، سال‌ها ماندگار است."
      ]
    },

    cares: {
      light: [
        { title: "نیاز نوری", description: "نور زیاد و غیرمستقیم تا مستقیم، نزدیک پنجره جنوبی." }
      ],
      watering: [
        { title: "آبیاری", description: "اجازه دهید خاک کاملاً خشک شود، سپس آبیاری کنید." }
      ],
      soil: [
        { title: "خاک", description: "خاک سبک با زهکشی عالی، مخصوص کاکتوس." }
      ],
      temperature: [
        { title: "دما و رطوبت", description: "۱۵ تا ۲۷ درجه، هوای خشک را تحمل می‌کند." }
      ],
      fertilization: [
        { title: "کوددهی", description: "ماهی یک بار در بهار و تابستان، نصف غلظت." }
      ]
    }
  },
  {
    id: "indoor-3",
    name: "سانسوریا",
    price: 750000,
    image: "/static/images/HousePlant/thirdFlower.png",
    slug: "sansevieria",
    category: "indoor",
    createdAt: new Date("2024-03-10"),
    liked: 210,
    discount: 10,
    stock: 0,

    potMaterial: "پلاستیکی یا سفالی",
    soilType: "مخصوص کاکتوس",
    weight: 1100,
    potDimensions: { length: 15, width: 15, height: 18 },
    sunlight: "نور غیرمستقیم تا سایه",
    images: ["/static/images/HousePlant/BabaAdam.png", "/static/images/HousePlant/eighthFlower.png", "/static/images/HousePlant/eleventhFlower.png", "/static/images/HousePlant/fifteenthFlower.png"],

    features: {
      overview: [
        "سانسوریا با نام علمی Sansevieria trifasciata، گیاهی فوق‌العاده مقاوم با برگ‌های کشیده و شمشیری شکل است.",
        "شب‌ها اکسیژن آزاد می‌کند و یکی از بهترین تصفیه‌کننده‌های طبیعی هوا است."
      ],
      appearance: [
        "برگ‌ها: ضخیم، گوشتی و شمشیری‌شکل.",
        "ساقه: ساقه هوایی ندارد.",
        "رشد: متوسط تا کند.",
        "گل: در آپارتمان نادر است."
      ],
      warnings: [
        "سمی بودن: در صورت بلعیدن، باعث تهوع می‌شود.",
        "آبیاری بیش از حد: باعث پوسیدگی ریشه می‌شود.",
        "نوک تیز برگ‌ها: هنگام جابجایی دقت کنید."
      ],
      propagation: [
        "تقسیم بوته: بهترین روش در بهار.",
        "قلمه برگ: زمان‌بر، واریته ابلق سبز می‌شود.",
        "پاجوش: جدا کردن پاجوش در بهار."
      ],
      summary: [
        "سانسوریا یک گیاه بی‌آزار و بی‌ادعا است، مخصوص مبتدیان و افراد پرمشغله.",
        "با کم‌ترین مراقبت، سال‌ها زینت‌بخش فضا خواهد بود."
      ]
    },

    cares: {
      light: [
        { title: "نور", description: "از نور کم تا نور غیرمستقیم روشن، فقط نور مستقیم شدید مضر است." }
      ],
      watering: [
        { title: "آبیاری", description: "اجازه دهید خاک کاملاً خشک شود، در زمستان بسیار کم." }
      ],
      soil: [
        { title: "خاک", description: "خاک سبک با زهکشی عالی، مخصوص کاکتوس." }
      ],
      temperature: [
        { title: "دما و رطوبت", description: "۱۵ تا ۲۵ درجه، هوای خشک را تحمل می‌کند." }
      ],
      fertilization: [
        { title: "کوددهی", description: "در بهار و تابستان ماهی یک بار، نصف غلظت." }
      ]
    }
  }
]