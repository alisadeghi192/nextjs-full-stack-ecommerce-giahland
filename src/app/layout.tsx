import GeneralProvider from "@/components/providers/GeneralProvider";
import { getMeAction } from "@/features/auth/actions/me.actions";
import ScrollToTop from "@/lib/utils/ScrollToTop";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "گیاه لند | فروشگاه  گیاهان آپارتمانی و مشاوره گیاه‌پزشکی",
  description:
    "خرید آنلاین گیاهان آپارتمانی، دکوراتیو و کادویی با قیمت مناسب. مشاوره رایگان با گیاه‌پزشک، تشخیص بیماری و آفات گیاهان + ارسال سریع به سراسر کشور.",
  keywords: [
    "فروشگاه گیاهان آپارتمانی",
    "خرید گیاه",
    "مشاوره گیاه پزشکی",
    "تشخیص بیماری گیاهان",
    "گیاه لند",
    "گیاهان دکوراتیو",
    "گل و گیاه",
  ],
  authors: [{ name: "گیاه لند" }],
  openGraph: {
    title: "گیاه لند | فروشگاه آنلاین گیاهان و مشاوره گیاه‌پزشکی",
    description:
      "خرید آنلاین گیاهان آپارتمانی، دکوراتیو و کادویی با قیمت مناسب. مشاوره رایگان با گیاه‌پزشک، تشخیص بیماری و آفات گیاهان.",
    url: "",
    siteName: "گیاه لند",
    locale: "fa_IR",
    type: "website",
    images: [
      {
        url: "/static/images/logo.webp",
        width: 512,
        height: 512,
        alt: "لوگوی گیاه لند",
      },
    ],
  },
};

export const viewport : Viewport= {
  themeColor: "#417f56", 
};

const modamFont = localFont({
  src: [
    {
      path: "../../public/static/fonts/Modam-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/Modam-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/Modam-Medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/Modam-SemiBold.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/Modam-Bold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/Modam-ExtraBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/static/fonts/Modam-Black.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-modam",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user: initialUser } = await getMeAction();
  return (
    <html
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${modamFont.variable} scroll-smooth`}
    >
      <body className="font-modam text-BLACK antialiased">
        <GeneralProvider initialUser={initialUser}>
          <div className="flex min-h-dvh flex-col justify-between">
            {children}
          </div>
        </GeneralProvider>
        <ScrollToTop />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
