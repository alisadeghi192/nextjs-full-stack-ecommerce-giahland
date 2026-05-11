import { ReactNode } from "react";
import PublicHeader from "@/components/shared/layout/public/header/PublicHeader";
import Footer from "@/components/shared/layout/public/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader />
      {children}
      <Footer />
    </>
  );
}
