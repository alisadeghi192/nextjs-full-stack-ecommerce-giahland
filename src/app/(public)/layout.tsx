import Footer from "@/components/shared/layout/public/Footer";
import PublicHeader from "@/components/shared/layout/public/header/PublicHeader";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicHeader />
      {children}
      <Footer />
    </>
  );
}
