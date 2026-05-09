export const navLinks = [
  { text: "صفحه اصلی", href: "/" },
  {
    text: "محصولات",
    href: "/products",
    submenu: [
      { href: "/products?category=indoor", text: "آپارتمانی" },
      { href: "/products?category=decoration", text: "دکوراتیو" },
      { href: "/products?category=gift", text: "کادویی" },
      { href: "/products?category=discounted", text: "تخفیف‌دار" },
    ],
  },
  { text: "گیاه پزشک", href: "/plant-doctor" },
  {
    text: "مجله",
    href: "/blog",
    submenu: [
      { href: "/blog?category=intro", text: "معرفی گیاهان" },
      { href: "/blog?category=care", text: "مراقبت و نگهداری" },
      { href: "/blog?category=health", text: "آفت‌ها و بیماری‌ها" },
    ],
  },
  { text: "تماس با ما", href: "/contact-us" },
  { text: "درباره ما", href: "/about-us" },
];
